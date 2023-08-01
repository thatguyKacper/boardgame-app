import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Param,
  Post,
  Request,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AddToService } from './add-to.service';

@Controller('boardgames/:id/action')
@SerializeOptions({ strategy: 'exposeAll' })
@UseInterceptors(ClassSerializerInterceptor)
export class AddToController {
  constructor(private readonly addToService: AddToService) {}

  @UseGuards(JwtAuthGuard)
  @Post('add-as-played')
  async addAsPlayed(@Param('id') id: number, @Request() req) {
    return await this.addToService.addAsPlayed(+id, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('add-to-wishlist')
  async addToWishlist(@Param('id') id: number, @Request() req) {
    return await this.addToService.addToWishlist(+id, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('remove-from-played')
  async removeFromAsPlayed(@Param('id') id: number, @Request() req) {
    return await this.addToService.removeFromAsPlayed(+id, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('remove-from-wishlist')
  async removeFromWishlist(@Param('id') id: number, @Request() req) {
    return await this.addToService.removeFromWishlist(+id, req.user.userId);
  }
}
