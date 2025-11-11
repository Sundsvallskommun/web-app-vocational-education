import { IsArray, IsOptional, IsString } from 'class-validator';

export class UserSavedSearchDto {
  @IsString()
  searchTerm: string;
  @IsString()
  parameters: string;
}

export class UserSavedInterestDto {
  @IsString()
  category: string;
  @IsString()
  level: string;
  @IsArray()
  studyLocation: string[];
  @IsString()
  timeInterval: string;
  @IsOptional()
  @IsString()
  timeIntervalFrom: string;
  @IsOptional()
  @IsString()
  timeIntervalTo: string;
}
