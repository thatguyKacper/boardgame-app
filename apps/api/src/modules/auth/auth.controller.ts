import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { UpdateUserDto } from '../users/dtos/update-user.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async signin(@Request() req) {
    return this.authService.signin(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/profile/edit')
  async editProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.update(updateUserDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/profile/delete')
  async deleteProfile(@Request() req) {
    return this.authService.remove(req.user);
  }

  @Post('/signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }
}
