import { IsOptional, IsPositive, IsString } from 'class-validator';

export class FilterBoardgameDto {
  @IsOptional()
  name: string;
  @IsOptional()
  @IsString()
  designer: string;
  @IsOptional()
  @IsString()
  artist: string;
  @IsOptional()
  yearpublished: number;
  @IsOptional()
  @IsPositive()
  minplayers: number;
  @IsOptional()
  @IsPositive()
  maxplayers: number;
  @IsOptional()
  @IsPositive()
  minage: number;
  @IsOptional()
  @IsPositive()
  playingtime: number;
  @IsOptional()
  @IsString()
  publisher: string;
  @IsOptional()
  @IsString()
  category: string;
  @IsOptional()
  @IsString()
  mechanic: string;
}
