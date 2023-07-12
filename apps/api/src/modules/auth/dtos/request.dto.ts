import { Exclude } from 'class-transformer';

export class RequestDto {
  id: number;

  email: string;

  token: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<RequestDto>) {
    Object.assign(this, partial);
  }
}
