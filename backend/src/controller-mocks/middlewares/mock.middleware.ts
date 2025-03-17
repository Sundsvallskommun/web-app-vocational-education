import cs, { MockService } from '@/controller-mocks/services/mock.service';
import { ControllerEndpointMocks, MockOptionFunction, MockOptions, MockOptionsOrFunction } from '@/controller-mocks/types';
import { NextFunction, Request, Response } from 'express';
import _ from 'lodash';

export const mockMiddleware =
  <TMockOptions extends MockOptions = MockOptions>(
    mockOptions?: TMockOptions | ((parameters: { req: Request; res: Response }) => TMockOptions),
    options?: { cs?: MockService },
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const _cs = options.cs ?? cs;
    if (_cs.options.enable) {
      const _mockOptions = typeof mockOptions === 'function' ? (mockOptions as MockOptionFunction)({ req, res }) : mockOptions;
      console.log(`Mocking ${req.route?.path ? `${req.route.path}` : `global`} (${Object.keys(mockOptions).toString()})`);

      Object.keys(_mockOptions).forEach(key => {
        if (key === 'req') {
          _.merge(req, _mockOptions.req);
        } else {
          _cs.setService(key, _mockOptions?.[key]);
        }
      });

      res.on('finish', () => {
        _cs.reset();
      });
    }
    next();
  };

export const mockCleanupMiddleware = (options?: { cs?: MockService }) => async (req: Request, res: Response, next: NextFunction) => {
  const _cs = options.cs ?? cs;
  if (_cs.options.enable) {
    _cs.reset();
  }
  next();
};

export const mockControllerMiddleware =
  (mocks: ControllerEndpointMocks, options?: { cs?: MockService }) => async (req: Request, res: Response, next: NextFunction) => {
    const _cs = options.cs ?? cs;
    if (_cs.options.enable) {
      const path = `${_cs.options.prefixToAdd ?? ''}${req.route?.path}`.replace(_cs.options.prefixToRemove, '');
      if (path && mocks?.[path]) {
        const mockOptions: MockOptionsOrFunction = mocks[path][req.method.toLowerCase()];
        const _mockOptions = typeof mockOptions === 'function' ? mockOptions({ req, res }) : mockOptions;
        console.log(`Mocking ${path} (${Object.keys(_mockOptions).toString()})`);

        Object.keys(_mockOptions).forEach(key => {
          if (key === 'req') {
            _.merge(req, _mockOptions.req);
          } else {
            _cs.setService(key, _mockOptions?.[key]);
          }
        });

        res.on('finish', () => {
          _cs.reset();
        });
      }
    }
    next();
  };
