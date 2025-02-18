import { LayoutData, LayoutDataResponse } from '@interfaces/admin-data';
import { ApiResponse, apiService } from './api-service';

export interface LayoutResponse {
  props?: LayoutDataResponse;
  redirect?: { permanent: boolean; destination: string };
}

export const getLayout: () => Promise<LayoutResponse> = () => {
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
