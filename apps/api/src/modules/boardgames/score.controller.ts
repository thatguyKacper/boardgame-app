import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Request,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ScoreService } from './score.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('boardgames/:id/score')
@SerializeOptions({ strategy: 'exposeAll' })
@UseInterceptors(ClassSerializerInterceptor)
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/add')
  async addScore(
    @Param('id') id: number,
    @Request() req,
    @Body('score') score: number,
  ) {
    return await this.scoreService.addScore(+id, req.user.id, score);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/update')
  async updateScore(
    @Param('id') id: number,
    @Request() req,
    @Body('score') score: number,
  ) {
    return await this.scoreService.updateScore(+id, req.user.id, score);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/remove')
  async removeScore(@Param('id') id: number, @Request() req) {
    return await this.scoreService.removeScore(+id, req.user.id);
  }
}
