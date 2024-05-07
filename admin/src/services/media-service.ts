import { MediaResponse, MediaDto } from '../interfaces/media';
import { ApiResponse, ServiceResponse, apiService } from '../providers/apiProvider';
import { MediaForm } from '../resources/components/gallery/gallery.component';
import { apiURL } from '../utils/api-url';

const handleGetAllMedia: (res: ApiResponse<MediaResponse[]>) => MediaResponse[] = (res) =>
  res.data.map((data) => ({
    id: data.id,
    title: data.title,
    alt: data.alt,
    filename: data.filename,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    src: apiURL(data.src),
  }));

const handleGetMedia: (res: ApiResponse<MediaResponse>) => MediaResponse = (res) => ({
  id: res.data.id,
  title: res.data.title,
  alt: res.data.alt,
  filename: res.data.filename,
  createdAt: res.data.createdAt,
  updatedAt: res.data.updatedAt,
  src: apiURL(res.data.src),
});

export const getAllMedia: () => Promise<ServiceResponse<MediaResponse[]>> = () => {
  return apiService
    .get<ApiResponse<MediaResponse[]>>('media/all')
    .then((res) => ({ data: handleGetAllMedia(res.data), message: res.data.message }))
    .catch((e) => ({
      message: e.response.data.message,
      error: e.response?.status ?? 'UNKNOWN ERROR',
    }));
};

export const saveMedia: (media: MediaForm) => Promise<ServiceResponse<MediaResponse>> = (media: MediaForm) => {
  const formData = new FormData();
  if (media.media) {
    formData.append('media', media.media[0]);
  }
  formData.append('title', media.title);
  formData.append('alt', media.alt);
  formData.append('filename', media.filename);

  return apiService
    .post<ApiResponse<MediaResponse>>('media', formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    })
    .then((res) => ({ data: handleGetMedia(res.data), message: res.data.message }))
    .catch((e) => ({
      message: e.response.data.message,
      error: e.response?.status ?? 'UNKNOWN ERROR',
    }));
};

export const editMedia: (media: MediaForm & MediaDto) => Promise<ServiceResponse<MediaResponse>> = (media) => {
  const data: MediaDto = {
    id: media.id,
    title: media.title,
    alt: media.alt,
  };
  return apiService
    .put<ApiResponse<MediaResponse>>(`media/${data.id}`, data)
    .then((res) => ({ data: handleGetMedia(res.data), message: res.data.message }))
    .catch((e) => ({
      message: e.response.data.message,
      error: e.response?.status ?? 'UNKNOWN ERROR',
    }));
};

export const deleteMedia: (id: MediaDto['id']) => Promise<ServiceResponse<{}>> = (id) => {
  return apiService
    .delete<ApiResponse<{}>>(`media/${id}`)
    .then((res) => ({ data: res.data, message: res.data.message }))
    .catch((e) => ({
      message: e.response.data.message,
      error: e.response?.status ?? 'UNKNOWN ERROR',
    }));
};
