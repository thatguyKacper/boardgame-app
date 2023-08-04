import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  HttpCode,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  Request,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { UpdateUserDto } from '../users/dtos/update-user.dto';

@Controller()
@SerializeOptions({ strategy: 'exposeAll' })
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/signin')
  async signin(@Request() req) {
    return this.authService.signin(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @Patch('/profile/:id')
  async editProfile(
    @Request() req,
    @Body() updateUserDto: UpdateUserDto,
    @Param('id') id: number,
  ) {
    const result = await this.authService.update(updateUserDto, req.user, id);

    if (result.affected !== 1) {
      throw new InternalServerErrorException();
    }
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @Delete('/profile/:id')
  async deleteProfile(@Request() req, @Param('id') id: number) {
    const result = await this.authService.remove(req.user, id);

    if (result.affected !== 1) {
      throw new InternalServerErrorException();
    }
  }

  @Post('/signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }
}
