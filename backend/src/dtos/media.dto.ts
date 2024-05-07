import { IsNumber, IsString } from 'class-validator';

export class NewMediaDto {
  @IsString()
  title: string;
  @IsString()
  alt: string;
}

export class MediaDto {
  @IsNumber()
  id: number;
  @IsString()
  title: string;
  @IsString()
  alt: string;
}
