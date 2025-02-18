const defaultOptions = {
  enable: true,
  prefixToRemove: '',
  prefixToAdd: '',
};

export class MockService<T = { [key: string]: unknown }> {
  private initServices: T;
  public options: Partial<typeof defaultOptions> = defaultOptions;

  constructor(services?: T, options?: Partial<typeof defaultOptions>) {
    if (services) {
      this.initServices = { ...services };
      Object.keys(services).forEach(key => {
        (this as unknown)[key] = services[key];
      });
    }
    this.options = options;
  }

  public setService = <K extends string, S>(name: K, service: S): void => {
    (this as unknown)[name] = service;
    this.initServices = { ...this.initServices, [name]: service };
  };

  public reset = (): void => {
    Object.keys(this.initServices).forEach(key => {
      (this as unknown)[key] = this.initServices[key];
    });
  };
}

const cs = new MockService();
export default cs;
