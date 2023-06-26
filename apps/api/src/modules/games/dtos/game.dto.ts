import { Expose } from 'class-transformer';

export class GameDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
}
