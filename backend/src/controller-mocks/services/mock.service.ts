import { Request } from 'express';
import { ControllerEndpointMocks, MockOptionsOrFunction } from '../types';

const defaultOptions = {
  enable: true,
  prefixToRemove: '',
  prefixToAdd: '',
};

export class MockService<T extends { [key: string]: unknown } = Record<string, unknown>> {
  private initServices: T;
  public options: Partial<typeof defaultOptions> = defaultOptions;
  public mocks: ControllerEndpointMocks = {};

  constructor(services?: T, mocks?: ControllerEndpointMocks, options?: Partial<typeof defaultOptions>) {
    if (services) {
      this.initServices = services;
      Object.keys(services).forEach(key => {
        (this as unknown)[key] = services[key];
      });
    }
    if (mocks) {
      this.mocks = mocks;
    }
    this.options = options;
  }

  public setService = <K extends string, S>(name: K, service: S): void => {
    (this as unknown)[name] = service;
  };

  public reset = (): void => {
    Object.keys(this.initServices).forEach(key => {
      (this as unknown)[key] = this.initServices[key];
    });
  };

  public use = (req: Request): T => {
    if (this.options.enable) {
      const path = `${this.options.prefixToAdd ?? ''}${req.route?.path}`.replace(this.options.prefixToRemove, '');
      if (path && this.mocks?.[path]) {
        const mockOptions: MockOptionsOrFunction = this.mocks[path][req.method.toLowerCase()];
        const _mockOptions = typeof mockOptions === 'function' ? mockOptions({ req }) : mockOptions;
        console.log(`Mocking ${path} (${Object.keys(_mockOptions).toString()})`);
        return _mockOptions as T;
      }
    }
    return this.initServices;
  };
}

const cs = new MockService();
export default cs;
