import { IsString } from 'class-validator';

export class ContactFormDto {
  @IsString()
  municipalityEmail: string;
  @IsString()
  name: string;
  @IsString()
  email: string;
  @IsString()
  message: string;
}
