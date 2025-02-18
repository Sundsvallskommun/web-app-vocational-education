import { PageData, PageDataResponse, PagesData } from '@interfaces/admin-data';
import { ApiResponse, apiService } from './api-service';

export interface PageResponse {
  props?: PageDataResponse;
  redirect?: { permanent: boolean; destination: string };
}

export const getPage: (url: string) => Promise<PageResponse> = (url) => {
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
