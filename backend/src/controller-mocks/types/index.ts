import { RequestWithUser } from '@/interfaces/auth.interface';
import { Request, Response } from 'express';

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export interface MockOptions {
  req?: DeepPartial<RequestWithUser>;
  [key: string]: unknown;
}

export type MockOptionFunction<TMockOptions extends MockOptions = MockOptions> = (options: { req?: Request; res?: Response }) => TMockOptions;
export type MockOptionsOrFunction<TMockOptions extends MockOptions = MockOptions> = TMockOptions | MockOptionFunction<TMockOptions>;
export type ControllerEndpointMock<TMockOptions extends MockOptions = MockOptions> = Partial<
  Record<'get' | 'post' | 'put' | 'patch' | 'delete', MockOptionsOrFunction<TMockOptions>>
>;
export type ControllerEndpointMocks<TMockOptions extends MockOptions = MockOptions> = Record<string, ControllerEndpointMock<TMockOptions>>;
