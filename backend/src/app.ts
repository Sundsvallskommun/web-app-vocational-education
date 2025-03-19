import prisma from '@/utils/prisma';
import { BASE_URL_PREFIX, CREDENTIALS, LOG_FORMAT, NODE_ENV, ORIGIN, PORT, SECRET_KEY, SESSION_MEMORY, SWAGGER_ENABLED, TEST } from '@config';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import bcrypt from 'bcryptjs';
import { defaultMetadataStorage } from 'class-transformer/cjs/storage';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { rateLimit } from 'express-rate-limit';
import session from 'express-session';
import { existsSync, mkdirSync } from 'fs';
import helmet from 'helmet';
import hpp from 'hpp';
import createMemoryStore from 'memorystore';
import morgan from 'morgan';
import passport from 'passport';
import passportCustom from 'passport-custom';
import path, { join } from 'path';
import 'reflect-metadata';
import { getMetadataArgsStorage, useExpressServer } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import createFileStore from 'session-file-store';
import swaggerUi from 'swagger-ui-express';
import { mockLoggedInUser } from './controller-mocks/user.mock';
import { SessionUser } from './interfaces/users.interface';
import authMiddleware from './middlewares/auth.middleware';
import { hasRoles } from './middlewares/permissions.middleware';
import { generate2FACode, getPermissions, getRoles, send2FACodeToEmail } from './services/authorization.service';
import cs from './services/controller.service';
import { getClientUser } from './services/user.service';
import { mockMiddleware } from './utils/controller-mocks/middlewares/mock.middleware';
import { additionalConverters } from './utils/custom-validation-classes';
import { imageUploadSettings } from './utils/files/imageUploadSettings';
import { omit } from './utils/object';
import { dataDir } from './utils/util';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 300, // Limit each IP to 300 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

const CustomStrategy = passportCustom.Strategy;

const corsWhitelist = ORIGIN.split(',');

const SessionStoreCreate = SESSION_MEMORY ? createMemoryStore(session) : createFileStore(session);
const sessionTTL = 4 * 24 * 60 * 60;
// NOTE: memory uses ms while file uses seconds
const sessionStore = new SessionStoreCreate(SESSION_MEMORY ? { checkPeriod: sessionTTL * 1000 } : { sessionTTL, path: './data/sessions' });

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

const customStrategy = new CustomStrategy(async (req, done) => {
  // Extract username and password from request body
  const { username, password } = req.body;

  // verify user exists
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
    include: {
      roles: true,
    },
  });

  // verify user exists
  if (!user) {
    return done(null, false);
  }

  // verify password
  if (!(await bcrypt.compare(password, user.password))) {
    return done(null, false);
  }

  const sessionUser: SessionUser = {
    ...omit(user, ['password']),
    permissions: getPermissions(getRoles(user.roles), true),
    roles: getRoles(user.roles),
  };

  return done(null, sessionUser);
});

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;
  public swaggerEnabled: boolean;

  constructor(Controllers: Function[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;
    this.swaggerEnabled = SWAGGER_ENABLED || false;

    this.initializeDataFolders();

    this.initializeMiddlewares();
    this.initializeRoutes(Controllers);
    if (this.swaggerEnabled) {
      this.initializeSwagger(Controllers);
    }
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(hpp());
    this.app.use(cookieParser());

    if (TEST) {
      // NOTE: Mock user in test mode
      this.app.use(mockMiddleware(mockLoggedInUser, { cs: cs }));
    }

    if (!TEST) {
      this.app.use(limiter);
    }

    this.app.use(
      session({
        secret: SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
      }),
    );

    this.app.use(passport.initialize());
    this.app.use(passport.session());
    // passport.use('saml', samlStrategy);
    passport.use('initial-auth', customStrategy);

    this.app.set('query parser', 'extended');

    this.app.use(
      cors({
        credentials: CREDENTIALS,
        origin: function (origin, callback) {
          if (origin === undefined || corsWhitelist.indexOf(origin) !== -1) {
            callback(null, true);
          } else {
            if (NODE_ENV == 'development') {
              callback(null, true);
            } else {
              callback(new Error('Not allowed by CORS'));
            }
          }
        },
      }),
    );

    // NOTE: Serve static files from media folder
    this.app.use(
      `${BASE_URL_PREFIX}/${imageUploadSettings.SERVE_PATH}`,
      express.static(path.join(dataDir(imageUploadSettings.UPLOAD_FOLDER)), {
        setHeaders: function (res) {
          res.set('Cross-Origin-Resource-Policy', 'same-site');
        },
      }),
    );

    // Admin
    this.app.use(`${BASE_URL_PREFIX}/admin/:resource`, authMiddleware, hasRoles(['EDUCATIONCOORDINATOR']));

    this.app.post(`${BASE_URL_PREFIX}/login`, (req, res, next) => {
      return passport.authenticate('initial-auth', {}, async function (err, user: SessionUser) {
        if (err) {
          return next(err);
        }

        if (!user) {
          return res.status(400).send({ data: 'INVALID_CREDENTIALS', message: 'failure' });
        }
        const twoFactorCode = generate2FACode(); // Implement this function as per your logic
        if (NODE_ENV == 'development') {
          console.log('twoFactorCode', twoFactorCode);
        }
        try {
          await send2FACodeToEmail(user.email, twoFactorCode);
        } catch (err) {
          //
        }

        await req.logIn(user, function (err) {
          if (err) {
            NODE_ENV == 'development';
            return next(err);
          }
          req.session.twoFactorCode = twoFactorCode;
          req.session.twoFactorCodeExpiry = Date.now() + 10 * 60 * 1000; // Code expires in 10 minutes
          // User is now authenticated and session is established.
          res.send({ data: true, message: 'success' });
        });
      })(req, res, next);
    });

    this.app.post(`${BASE_URL_PREFIX}/verify-2fa`, (req, res) => {
      const { code } = req.body;
      // Check if code matches and hasn't expired
      if (req.session.twoFactorCode === code && req.session.twoFactorCodeExpiry > Date.now()) {
        req.session.twoFactorAuthenticated = true; // Mark session as 2FA verified
        return res.send({ data: getClientUser(req.user), message: 'success' });
      } else {
        return res.status(400).send({ data: 'INVALID_CODE_OR_EXPIRED', message: 'failure' }); // Code mismatch or expired, ask to try again
      }
    });

    this.app.post(`${BASE_URL_PREFIX}/logout`, function (req, res, next) {
      req.logout(function (err) {
        if (err) {
          return next(err);
        }
        res.send({ data: true, message: 'success' });
      });
    });
  }

  private initializeRoutes(controllers: Function[]) {
    useExpressServer(this.app, {
      routePrefix: BASE_URL_PREFIX,
      controllers: controllers,
      defaultErrorHandler: false,
    });
  }

  private initializeSwagger(controllers: Function[]) {
    const schemas = validationMetadatasToSchemas({
      classTransformerMetadataStorage: defaultMetadataStorage,
      refPointerPrefix: '#/components/schemas/',
      additionalConverters: additionalConverters,
    });

    const routingControllersOptions = {
      controllers: controllers,
    };

    const storage = getMetadataArgsStorage();
    const spec = routingControllersToSpec(storage, routingControllersOptions, {
      components: {
        schemas: schemas as { [schema: string]: unknown },
        securitySchemes: {
          basicAuth: {
            scheme: 'basic',
            type: 'http',
          },
        },
      },
      info: {
        description: 'Yrkesutbildningar Mitt',
        title: 'API',
        version: '1.0.0',
      },
    });

    this.app.use(`${BASE_URL_PREFIX}/api-docs`, swaggerUi.serve, swaggerUi.setup(spec));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeDataFolders() {
    const databaseDir: string = join(__dirname, '../data/database');
    if (!existsSync(databaseDir)) {
      mkdirSync(databaseDir, { recursive: true });
    }
    const logsDir: string = join(__dirname, '../data/logs');
    if (!existsSync(logsDir)) {
      mkdirSync(logsDir, { recursive: true });
    }
    const sessionsDir: string = join(__dirname, '../data/sessions');
    if (!existsSync(sessionsDir)) {
      mkdirSync(sessionsDir, { recursive: true });
    }
    const uploadsDir: string = join(__dirname, '../data/uploads');
    if (!existsSync(uploadsDir)) {
      mkdirSync(uploadsDir, { recursive: true });
    }
  }
}

export default App;
