import { BASE_URL_PREFIX, TEST } from '@/config';
import ApiService, { ApiResponse } from './api.service';
import { PrismaClient } from '@prisma/client';
import { MockService } from '@/controller-mocks/services/mock.service';
import { MockOptions } from '@/controller-mocks/types';
import { AxiosRequestConfig } from 'axios';
import mocks from '@/controllers-mocks';

let apiService: ApiService;
if (process.env.NODE_ENV === 'production') {
  apiService = new ApiService();
} else {
  if (!global.apiService) {
    global.apiService = new ApiService();
  }

  apiService = global.apiService;
}

let prisma: PrismaClient;
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }

  prisma = global.prisma;
}

type MockedApiService = {
  get?: (config: AxiosRequestConfig) => Promise<ApiResponse>;
  post?: (config: AxiosRequestConfig) => Promise<ApiResponse>;
  patch?: (config: AxiosRequestConfig) => Promise<ApiResponse>;
  put?: (config: AxiosRequestConfig) => Promise<ApiResponse>;
  delete?: (config: AxiosRequestConfig) => Promise<ApiResponse>;
};

type MockedPrisma = {
  [key: string]: {
    findUnique?: (parameters: unknown) => Promise<unknown>;
    findUniqueOrThrow?: (parameters: unknown) => Promise<unknown>;
    findFirst?: (parameters: unknown) => Promise<unknown>;
    findFirstOrThrow?: (parameters: unknown) => Promise<unknown>;
    findMany?: (parameters: unknown) => Promise<unknown>;
    create?: (parameters: unknown) => Promise<unknown>;
    createMany?: (parameters: unknown) => Promise<unknown>;
    delete?: (parameters: unknown) => Promise<unknown>;
    update?: (parameters: unknown) => Promise<unknown>;
    deleteMany?: (parameters: unknown) => Promise<unknown>;
    updateMany?: (parameters: unknown) => Promise<unknown>;
    upsert?: (parameters: unknown) => Promise<unknown>;
    count?: (parameters: unknown) => Promise<unknown>;
    aggregate?: (parameters: unknown) => Promise<unknown>;
    groupBy?: (parameters: unknown) => Promise<unknown>;
  };
};

export interface MockServices extends MockOptions {
  apiService?: MockedApiService;
  prisma?: MockedPrisma;
}

class ControllerService extends MockService<{
  apiService: typeof apiService;
  prisma: typeof prisma;
  [key: string]: unknown;
}> {
  public apiService: typeof apiService;
  public prisma: typeof prisma;
}

const cs = new ControllerService({ prisma, apiService }, mocks, {
  enable: TEST,
  prefixToRemove: BASE_URL_PREFIX,
});

export default cs;
