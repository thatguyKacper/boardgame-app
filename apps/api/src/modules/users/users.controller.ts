import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  UseInterceptors,
  ClassSerializerInterceptor,
  SerializeOptions,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
@SerializeOptions({ strategy: 'excludeAll' })
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.usersService.findOneById(parseInt(id));
  }

  @Delete('/:id')
  @HttpCode(204)
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }
}
