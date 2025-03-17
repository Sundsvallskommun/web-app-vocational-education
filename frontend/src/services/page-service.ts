import { PageData, PageDataResponse, PagesData } from '@interfaces/admin-data';
import { IncomingMessage, ServerResponse } from 'node:http';
import { ApiResponse, apiService } from './api-service';

export interface PageResponse {
  props?: PageDataResponse;
  redirect?: { permanent: boolean; destination: string };
}

export const getPage: (url: string, res: ServerResponse<IncomingMessage>) => Promise<PageResponse> = (url, res) => {
  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
  return apiService
    .get<ApiResponse<PageData>>(`page`, { params: { url: url } })
    .then((res) => ({ props: { pageData: res.data.data } }))
    .catch(() => ({
      redirect: {
        permanent: false,
        destination: '/404',
      },
    }));
};

export const getAdminPages: () => Promise<PagesData[]> = () => {
  return apiService
    .get<ApiResponse<PagesData[]>>(`pages`)
    .then((res) => res.data.data)
    .catch(() => []);
};
