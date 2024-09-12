import { IsArray, IsOptional, IsString } from 'class-validator';

export class SavedSearchDto {
  @IsString()
  searchTerm: string;
  @IsString()
  parameters: string;
}

export class SavedInterestDto {
  @IsString()
  category: string;
  @IsString()
  type: string;
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
