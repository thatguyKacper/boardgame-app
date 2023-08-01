import { Exclude } from 'class-transformer';

export class BoardgameDto {
  id: number;
  name: string;
  @Exclude()
  designer: string[];
  @Exclude()
  artist: string[];
  @Exclude()
  yearpublished: number;
  @Exclude()
  minplayers: number;
  @Exclude()
  maxplayers: number;
  @Exclude()
  minage: number;
  @Exclude()
  playingtime: number;
  @Exclude()
  publisher: string[];
  @Exclude()
  category: string[];
  @Exclude()
  mechanic: string[];
  @Exclude()
  bggurl: string;
}
