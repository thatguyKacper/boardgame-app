import { Expose } from 'class-transformer';

export class BoardgameDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
}
