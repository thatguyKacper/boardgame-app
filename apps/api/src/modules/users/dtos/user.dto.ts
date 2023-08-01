import { Exclude, Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class UserDto {
  @IsOptional()
  id?: number;

  @IsOptional()
  email?: string;

  @Exclude()
  password: string;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  page?: number;
}
