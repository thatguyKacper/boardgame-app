import { Transform } from 'class-transformer';
import { IsNumber, IsString, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateBoardgameDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString({ each: true })
  @IsNotEmpty()
  designer: string[];
  @IsString({ each: true })
  @IsNotEmpty()
  artist: string[];
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsNotEmpty()
  @Max(2024)
  yearpublished: number;
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(8)
  minplayers: number;
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(100)
  maxplayers: number;
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsNotEmpty()
  @Min(2)
  @Max(18)
  minage: number;
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(25000)
  playingtime: number;
  @IsString({ each: true })
  @IsNotEmpty()
  publisher: string[];
  @IsString({ each: true })
  @IsNotEmpty()
  category: string[];
  @IsString({ each: true })
  @IsNotEmpty()
  mechanic: string[];
  @IsString()
  @IsNotEmpty()
  bggurl: string;
}
