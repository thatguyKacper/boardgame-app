export class BoardgameDto {
  id: number;
  name: string;

  constructor(partial: Partial<BoardgameDto>) {
    Object.assign(this, partial);
  }
}
