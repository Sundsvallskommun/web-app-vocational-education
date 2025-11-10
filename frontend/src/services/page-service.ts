import { PageData, PageDataResponse, PagesData } from '@interfaces/admin-data';
import { ApiResponse, apiService } from './api-service';

export const getPage: (url: string) => Promise<PageDataResponse> = (url) => {
  console.log('getPage calling /page route');
  return apiService
    .get<ApiResponse<PageData>>(`page`, { params: { url: url } })
    .then((res) => {
      console.log('page response:', JSON.stringify(res));
      return res;
    })
    .then((res) => ({ pageData: res.data.data }))
    .catch(() => ({ pageData: undefined }));
};

export const getAdminPages: () => Promise<PagesData[]> = () => {
  console.log('getAdminpages calling /pages route');
  return apiService
    .get<ApiResponse<PagesData[]>>(`pages`)
    .then((res) => {
      console.log('pages response:', JSON.stringify(res));
      return res;
    })
    .then((res) => res.data.data)
    .catch(() => []);
};
