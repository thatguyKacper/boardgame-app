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
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BoardgamesService } from './boardgames.service';
import { CreateBoardgameDto } from './dtos/create-boardgame.dto';
import { UpdateBoardgameDto } from './dtos/update-boardgame.dto';
import { QueryBoardgamesDto } from './dtos/query-boardgames.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('boardgames')
@SerializeOptions({ strategy: 'exposeAll' })
@UseInterceptors(ClassSerializerInterceptor)
export class BoardgamesController {
  constructor(private readonly boardgamesService: BoardgamesService) {}

  @Get('/lists')
  async getMostPlayed(@Query() filter: QueryBoardgamesDto) {
    return await this.boardgamesService.getBoardgamesFilteredPaginated(filter, {
      currentPage: filter.page,
      limit: 10,
    });
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
  @Post()
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
