import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BoardgamesService } from './boardgames.service';
import { CreateBoardgameDto } from './dtos/create-boardgame.dto';
import { UpdateBoardgameDto } from './dtos/update-boardgame.dto';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { QueryBoardgamesDto } from './dtos/query-boardgames.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('boardgames')
@UseInterceptors(ClassSerializerInterceptor)
// @UseInterceptors(new SerializeInterceptor(QueryBoardgamesDto))
export class BoardgamesController {
  constructor(private readonly boardgamesService: BoardgamesService) {}

  @Get('/lists')
  async getMostPlayed(@Query() filter: QueryBoardgamesDto) {
    return await this.boardgamesService.getBoardgamesFilteredTopPaginated(
      filter,
      {
        currentPage: filter.page,
        limit: 10,
      },
    );
  }

  @Get()
  async findAll(@Query() filter: QueryBoardgamesDto) {
    return await this.boardgamesService.getBoardgamesFilteredPaginated(filter, {
      currentPage: filter.page,
      limit: 50,
    });
  }

  @Get('/random')
  async random() {
    return await this.boardgamesService.getRandomBoardgame();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.boardgamesService.getBoardgame(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/add-as-played')
  async addAsPlayed(@Param('id') id: number, @Request() req) {
    return await this.boardgamesService.addAsPlayed(+id, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/add-to-wishlist')
  async addToWishlist(@Param('id') id: number, @Request() req) {
    return await this.boardgamesService.addToWishlist(+id, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/score-boardgame')
  async addScore(
    @Param('id') id: number,
    @Request() req,
    @Body('score') score: number,
  ) {
    return await this.boardgamesService.addScore(+id, req.user.userId, score);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/update-score')
  async updateScore(
    @Param('id') id: number,
    @Request() req,
    @Body('score') score: number,
  ) {
    return await this.boardgamesService.updateScore(
      +id,
      req.user.userId,
      score,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/remove-score')
  async removeScore(@Param('id') id: number, @Request() req) {
    return await this.boardgamesService.removeScore(+id, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/remove-from-played')
  async removeFromAsPlayed(@Param('id') id: number, @Request() req) {
    return await this.boardgamesService.removeFromAsPlayed(
      +id,
      req.user.userId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/remove-from-wishlist')
  async removeFromWishlist(@Param('id') id: number, @Request() req) {
    return await this.boardgamesService.removeFromWishlist(
      +id,
      req.user.userId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(new SerializeInterceptor(CreateBoardgameDto))
  async create(@Body() createBoardgameDto: CreateBoardgameDto) {
    return await this.boardgamesService.createBoardgame(createBoardgameDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBoardgameDto: UpdateBoardgameDto,
  ) {
    const result = await this.boardgamesService.updateBoardgame(
      id,
      updateBoardgameDto,
    );

    if (result.affected !== 1) {
      throw new NotFoundException();
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: number) {
    const result = await this.boardgamesService.removeBoardgame(+id);

    if (result.affected !== 1) {
      throw new NotFoundException();
    }
  }
}
