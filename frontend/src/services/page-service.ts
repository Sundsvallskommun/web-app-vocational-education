import { PageData, PageDataResponse, PagesData } from '@interfaces/admin-data';
import { NextApiResponse } from 'next';
import { ApiResponse, apiService } from './api-service';

interface PageResponse {
  props?: PageDataResponse;
  redirect?: { permanent: boolean; destination: string };
}

export const getPage: (url: string, res: NextApiResponse) => Promise<PageResponse> = (url, res) => {
  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
  return apiService
    .get<ApiResponse<PageData>>(`page`, { params: { url: url } })
    .then((res) => ({ props: { pageData: res.data.data } }))
    .catch(() => ({
      redirect: {
        permanent: false,
        destination: '/',
      },
    }));
};

export const getAdminPages: () => Promise<PagesData[]> = () => {
  return apiService
    .get<ApiResponse<PagesData[]>>(`pages`)
    .then((res) => res.data.data)
    .catch(() => []);
};
