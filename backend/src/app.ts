import prisma from '@/utils/prisma';
import { BASE_URL_PREFIX, CREDENTIALS, LOG_FORMAT, NODE_ENV, ORIGIN, PORT, SECRET_KEY, SESSION_MEMORY, SWAGGER_ENABLED } from '@config';
import errorMiddleware from '@middlewares/error.middleware';
import { User } from '@prisma/client';
import { logger, stream } from '@utils/logger';
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
import authMiddleware from './middlewares/auth.middleware';
import { hasRoles } from './middlewares/permissions.middleware';
import { generate2FACode, getPermissions, getRoles, send2FACodeToEmail } from './services/authorization.service';
import { getClientUser } from './services/user.service';
import { imageUploadSettings } from './utils/files/imageUploadSettings';
import { omit } from './utils/object';
import { dataDir } from './utils/util';
import bcrypt from 'bcryptjs';
import { additionalConverters } from './utils/custom-validation-classes';
import { SessionUser } from './interfaces/users.interface';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
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

// const samlStrategy = new Strategy(
//   {
//     acceptedClockSkewMs: 1000,
//     disableRequestedAuthnContext: true,
//     identifierFormat: 'urn:oasis:names:tc:SAML:2.0:nameid-format:transient',
//     callbackUrl: SAML_CALLBACK_URL,
//     entryPoint: SAML_ENTRY_SSO,
//     //decryptionPvk: SAML_PRIVATE_KEY,
//     privateKey: SAML_PRIVATE_KEY,
//     // Identity Provider's public key
//     cert: SAML_IDP_PUBLIC_CERT,
//     issuer: SAML_ISSUER,
//     wantAssertionsSigned: false,
//     // signatureAlgorithm: 'sha256',
//     // digestAlgorithm: 'sha256',
//     // maxAssertionAgeMs: 2592000000,
//     // authnRequestBinding: 'HTTP-POST',
//     logoutCallbackUrl: SAML_LOGOUT_CALLBACK_URL,
//   },
//   async function (profile: Profile, done: VerifiedCallback) {
//     const { givenName: givenname, surname, username, groups } = profile;

//     if (!profile) {
//       return done(null, null, {
//         name: 'SAML_MISSING_PROFILE',
//         message: 'SAML_MISSING_PROFILE',
//       });
//     }

//     if (!givenname || !surname) {
//       return done(null, null, {
//         name: 'SAML_MISSING_ATTRIBUTES',
//         message: 'SAML_MISSING_ATTRIBUTES',
//       });
//     }

//     const groupList = groups !== undefined ? groups.split(',') : [];

//     const appGroups = groupList.includes('sg_appl_yrkesutbildningar_read') ? groupList : groupList.concat('sg_appl_yrkesutbildningar_read');

//     try {
//       const user = {
//         name: `${givenname} ${surname}`,
//         givenname: givenname,
//         surname: surname,
//         username: username,
//         groups: appGroups,
//         permissions: getPermissions(appGroups as Roles[]),
//       };

//       done(null, user);
//     } catch (err) {
//       if (err instanceof HttpException && err?.status === 404) {
//         // TODO: Handle missing person form Citizen?
//       }
//       done(err);
//     }
//   },
// );

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
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());

    // FIXME: Enable when login-flow is corrected
    // this.app.use(limiter);

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
        await send2FACodeToEmail(user.email, twoFactorCode); // Implement email sending logic

        await req.logIn(user, function (err) {
          if (err) {
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

    // SAML below

    // this.app.get(
    //   `${BASE_URL_PREFIX}/saml/login`,
    //   (req, res, next) => {
    //     if (req.session.returnTo) {
    //       req.query.RelayState = req.session.returnTo;
    //     } else if (req.query.path) {
    //       req.query.RelayState = req.query.path;
    //     }
    //     next();
    //   },
    //   (req, res, next) => {
    //     passport.authenticate('saml', {
    //       failureRedirect: SAML_FAILURE_REDIRECT,
    //     })(req, res, next);
    //   },
    // );

    // this.app.get(`${BASE_URL_PREFIX}/saml/metadata`, (req, res) => {
    //   res.type('application/xml');
    //   const metadata = customStrategy.generateServiceProviderMetadata(SAML_PUBLIC_KEY, SAML_PUBLIC_KEY);
    //   res.status(200).send(metadata);
    // });

    // this.app.get(`${BASE_URL_PREFIX}/saml/logout`, bodyParser.urlencoded({ extended: false }), (req, res, next) => {
    //   customStrategy.logout(req as any, () => {
    //     req.logout(err => {
    //       if (err) {
    //         return next(err);
    //       }
    //       // FIXME: should we redirect here or should client do it?
    //       res.redirect(SAML_LOGOUT_REDIRECT);
    //     });
    //   });
    // });

    // this.app.get(`${BASE_URL_PREFIX}/saml/logout/callback`, bodyParser.urlencoded({ extended: false }), (req, res, next) => {
    //   // FIXME: is this enough or do we need to do something more?
    //   req.logout(err => {
    //     if (err) {
    //       return next(err);
    //     }
    //     // FIXME: should we redirect here or should client do it?
    //     res.redirect(SAML_LOGOUT_REDIRECT);
    //   });
    // });

    // this.app.post(
    //   `${BASE_URL_PREFIX}/saml/login/callback`,
    //   bodyParser.urlencoded({ extended: false }),
    //   (req, res, next) => {
    //     let successRedirect, failRedirect;
    //     if (isValidUrl(req.body.RelayState)) {
    //       successRedirect = req.body.RelayState;
    //     } else {
    //       successRedirect = `${SAML_SUCCESS_BASE}${req.body.RelayState}`;
    //     }

    //     if (req.session.messages?.length > 0) {
    //       failRedirect = SAML_FAILURE_REDIRECT_MESSAGE + `?failMessage=${req.session.messages[0]}`;
    //     } else {
    //       failRedirect = SAML_FAILURE_REDIRECT_MESSAGE;
    //     }

    //     passport.authenticate('saml', {
    //       successReturnToOrRedirect: req.body.RelayState ? successRedirect : SAML_SUCCESS_REDIRECT,
    //       failureRedirect: failRedirect,
    //       failureMessage: true,
    //     })(req, res, next);
    //   },
    //   (req, res, next) => {
    //     res.redirect(SAML_SUCCESS_REDIRECT);
    //   },
    // );
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
  }
}

export default App;
