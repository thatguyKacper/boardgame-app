import { Expose } from 'class-transformer';

export class RequestDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  token: string;

  constructor(partial: Partial<RequestDto>) {
    Object.assign(this, partial);
  }
}
