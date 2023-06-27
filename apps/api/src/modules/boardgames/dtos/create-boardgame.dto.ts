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
  @IsNumber()
  @IsNotEmpty()
  @Max(2024)
  yearpublished: number;
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(8)
  minplayers: number;
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(100)
  maxplayers: number;
  @IsNumber()
  @IsNotEmpty()
  @Min(2)
  @Max(18)
  minage: number;
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
