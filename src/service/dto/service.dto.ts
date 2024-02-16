import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class ServiceDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  icon: string;

  @IsOptional()
  @IsString()
  shortDescription: string;

  @IsOptional()
  @IsString()
  longDescription: string;

  @IsString()
  slug: string;
}

export class UpdateServiceDto {
    @IsOptional()
    @IsString()
    name: string;
  
    @IsOptional()
    @IsBoolean()
    published: boolean;
  
    @IsOptional()
    @IsString()
    icon: string;
  
    @IsOptional()
    @IsString()
    shortDescription: string;
  
    @IsOptional()
    @IsString()
    longDescription: string;
  
    @IsOptional()
    @IsString()
    slug: string;
  }
