import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class QueryBoardgamesDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  id?: number;
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsString()
  designer?: string;
  @IsOptional()
  @IsString()
  artist?: string;
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  yearpublished?: number;
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  minplayers?: number;
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  maxplayers?: number;
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  minage?: number;
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  playingtime?: number;
  @IsOptional()
  @IsString()
  publisher?: string;
  @IsOptional()
  @IsString()
  category?: string;
  @IsOptional()
  @IsString()
  mechanic?: string;
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  page?: number;
  @IsOptional()
  @IsString()
  sortBy?: string;
  @IsOptional()
  @IsString()
  sortOrder?: 'ASC' | 'DESC';
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10)
  @Transform(({ value }) => parseInt(value))
  score?: string;
  @IsOptional()
  @IsString()
  played?: string;
  @IsOptional()
  @IsString()
  wishlist?: string;
}
