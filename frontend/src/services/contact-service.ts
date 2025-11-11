import { ContactForm } from '@interfaces/user';
import { ApiResponse, apiService } from './api-service';
import { ServiceResponse } from '@interfaces/service';

export const sendFormData: (formData: ContactForm) => Promise<ServiceResponse<boolean>> = (formData) => {
  return apiService
    .post<ApiResponse<boolean>>('/contact', formData, { headers: { 'X-Referer': window.location.pathname } })
    .then(() => ({ data: true }))
    .catch((err) => ({
      error: err.response?.data?.data,
      message: err.response?.data?.message,
    }));
};
