import { ApiResponse, apiService } from './api-service';
import { PageData, PageDataResponse } from '@interfaces/admin-data';
import { NextApiResponse } from 'next';

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
