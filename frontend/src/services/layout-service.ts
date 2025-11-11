import { LayoutData, LayoutDataResponse } from '@interfaces/admin-data';
import { ApiResponse, apiService } from './api-service';

export const getLayout: () => Promise<LayoutDataResponse> = () => {
  return apiService
    .get<ApiResponse<LayoutData>>(`layout`)
    .then((res) => ({ layoutData: res.data.data }))
    .catch(() => ({ layoutData: undefined }));
};
