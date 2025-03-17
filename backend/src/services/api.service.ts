import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import { HttpException } from '@/exceptions/HttpException';
import { devLog } from '@/utils/logger';
import { apiURL } from '@/utils/util';
import qs from 'qs';
import ApiTokenService from './api-token.service';

export class ApiResponse<T = unknown> {
  data: T;
  message: string;
}

interface ApiServiceOptions {
  /**
   * @default (url) => apiURL(url)
   */
  urlTransform: (url: string) => string;
  /**
   * @default true
   */
  useToken: boolean;
}

class ApiService {
  private options = {
    urlTransform: url => apiURL(url),
    useToken: true,
  };

  constructor(options?: ApiServiceOptions) {
    this.options = Object.assign(this.options, options);
  }

  private apiTokenService = new ApiTokenService();
  private async request<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const token = this.options.useToken ? await this.apiTokenService.getToken() : '';

    const defaultHeaders = {
      ...(this.options.useToken ? { Authorization: `Bearer ${token}` } : {}),
      'Content-Type': 'application/json',
    };
    const defaultParams = {};

    const preparedConfig: AxiosRequestConfig = {
      ...config,
      headers: { ...defaultHeaders, ...config.headers },
      params: { ...defaultParams, ...config.params },
      paramsSerializer: params => {
        return qs.stringify(params, { indices: false });
      },
      url: this.options.urlTransform(config.url),
    };

    try {
      const res = await axios(preparedConfig);
      devLog(`Api: [${res.request?.res.statusCode}] ${res.request.method} ${res.request.path}`);
      return { data: res.data, message: 'success' };
    } catch (error: unknown | AxiosError) {
      if (axios.isAxiosError(error)) {
        devLog(`Api: [${error.response?.status}] ${error.response.request.method} ${error.response.request.path}`, { error: true });
        if ((error as AxiosError).response?.status === 404) {
          throw new HttpException(404, 'Not found');
        } else if ((error as AxiosError).response?.status === 400) {
          throw new HttpException(400, error.response.data.detail);
        }
      }
      // NOTE: did you subscribe to the API called?
      throw new HttpException(500, 'Internal server error from gateway');
    }
  }

  public async get<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: 'GET' });
  }

  public async post<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: 'POST' });
  }

  public async patch<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: 'PATCH' });
  }

  public async put<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: 'PUT' });
  }

  public async delete<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: 'DELETE' });
  }
}

export default ApiService;
