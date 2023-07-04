import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @Post('/signin')
  @UseGuards(AuthGuard('local'))
  async signin(@Request() req) {
    return { user: req.user, token: 'token will go here' };
  }
}
