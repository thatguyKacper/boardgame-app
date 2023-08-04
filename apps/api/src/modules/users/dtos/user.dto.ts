import { Transform } from 'class-transformer';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class UserDto {
  @IsNumber()
  id?: number;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  page?: number;
}
