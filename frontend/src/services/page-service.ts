import { PageData, PageDataResponse, PagesData } from '@interfaces/admin-data';
import { ApiResponse, apiService } from './api-service';

export const getPage: (url: string) => Promise<PageDataResponse> = (url) => {
  return apiService
    .get<ApiResponse<PageData>>(`page`, { params: { url: url } })
    .then((res) => ({ pageData: res.data.data }))
    .catch(() => ({ pageData: undefined }));
};

export const getAdminPages: () => Promise<PagesData[]> = () => {
  return apiService
    .get<ApiResponse<PagesData[]>>(`pages`)
    .then((res) => res.data.data)
    .catch(() => []);
};
