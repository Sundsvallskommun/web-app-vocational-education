import { LayoutData, LayoutDataResponse } from '@interfaces/admin-data';
import { IncomingMessage, ServerResponse } from 'node:http';
import { ApiResponse, apiService } from './api-service';

export interface LayoutResponse {
  props?: LayoutDataResponse;
  redirect?: { permanent: boolean; destination: string };
}

export const getLayout: (res: ServerResponse<IncomingMessage>) => Promise<LayoutResponse> = (res) => {
  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
  return apiService
    .get<ApiResponse<LayoutData>>(`layout`)
    .then((res) => ({ props: { layoutData: res.data.data } }))
    .catch(() => ({
      redirect: {
        permanent: false,
        destination: '/',
      },
    }));
};
