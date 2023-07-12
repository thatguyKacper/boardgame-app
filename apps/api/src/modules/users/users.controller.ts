import {
  Controller,
  Get,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dtos/user.dto';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(@Query() filter: UserDto) {
    return await this.usersService.getUsersFilteredPaginated(filter, {
      currentPage: filter.page,
      limit: 50,
    });
  }

  @Get('/:id')
  async findOne(@Param('id') id: number) {
    return await this.usersService.getUser(+id);
  }
}
