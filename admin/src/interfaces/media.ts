export interface MediaResponse {
  id: number;
  title: string;
  alt: string;
  filename: string;
  createdAt: Date;
  updatedAt: Date;
  src: string;
}

export interface InternalMedia extends Omit<MediaResponse, 'src' | 'id' | 'createdAt' | 'updatedAt'> {
  src: string | ArrayBuffer | null;
  id?: MediaResponse['id'];
  createdAt?: MediaResponse['createdAt'];
  updatedAt?: MediaResponse['updatedAt'];
}

export interface MediaDto {
  id: number;
  title: string;
  alt: string;
}
