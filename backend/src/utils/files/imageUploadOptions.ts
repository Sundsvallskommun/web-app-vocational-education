import { Request } from 'express';
import multer from 'multer';
import { dataDir } from '../util';
import { imageUploadSettings } from './imageUploadSettings';
import fs from 'fs';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;
type FilterFileNameCallback = (error: Error | null, pass: boolean) => void;

const storage = multer.diskStorage({
  destination: (_req: Request, _file: Express.Multer.File, cb: DestinationCallback) => {
    cb(null, dataDir(imageUploadSettings.UPLOAD_FOLDER));
  },
  filename: (_req: Request, file: Express.Multer.File, cb: FileNameCallback) => {
    cb(null, imageUploadSettings.fileNameFormat(file.originalname));
  },
});

const fileFilter = (_request: Request, file: Express.Multer.File, callback: FilterFileNameCallback): void => {
  if (imageUploadSettings.FILE_TYPES.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const uploadOptions = () => ({
  limits: {
    fieldNameSize: 255,
    fileSize: 1024 * 1024 * 2, // 2mb
  },
  storage,
  fileFilter,
});

export const imageUpload = multer({ ...uploadOptions() });

export const imageUploadOptions = uploadOptions();

const deleteImageResultHandler = function (err) {
  if (err) {
    return false;
  } else {
    return true;
  }
};

export const deleteImage = (filename: string) => {
  fs.unlink(`${dataDir(imageUploadSettings.UPLOAD_FOLDER)}/${filename}`, deleteImageResultHandler);
};
