import { IsString } from 'class-validator';

export class ContactFormDto {
  @IsString()
  municipality: string;
  @IsString()
  name: string;
  @IsString()
  email: string;
  @IsString()
  message: string;
}
