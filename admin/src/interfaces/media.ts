export interface MediaResponse {
  id: number;
  title: string;
  alt: string;
  filename: string;
  createdAt: Date;
  updatedAt: Date;
  src: string;
}

export interface InternalMedia extends Pick<MediaResponse, 'title' | 'alt' | 'filename'> {
  src: string | ArrayBuffer | null;
  id?: MediaResponse['id'];
  createdAt?: MediaResponse['createdAt'];
  updatedAt?: MediaResponse['updatedAt'];
}

export type MediaHTMLAttributes = Pick<MediaResponse, 'title' | 'alt' | 'src'>;

export interface MediaDto {
  id: number;
  title: string;
  alt: string;
}
