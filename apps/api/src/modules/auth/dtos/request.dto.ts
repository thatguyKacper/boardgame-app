import { IsNumber, IsString } from 'class-validator';

export class RequestDto {
  @IsNumber()
  id: number;

  @IsString()
  token: string;
}
