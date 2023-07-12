import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class UserDto {
  @IsOptional()
  id?: number;

  @IsOptional()
  email?: string;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  page?: number;
}
