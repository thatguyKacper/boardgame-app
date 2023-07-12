import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { BoardgamesService } from './boardgames.service';
import { CreateBoardgameDto } from './dtos/create-boardgame.dto';
import { UpdateBoardgameDto } from './dtos/update-boardgame.dto';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { QueryBoardgamesDto } from './dtos/query-boardgames.dto';

@Controller('boardgames')
@UseInterceptors(new SerializeInterceptor(QueryBoardgamesDto))
export class BoardgamesController {
  constructor(private readonly boardgamesService: BoardgamesService) {}

  @Get('/lists')
  async getMostPlayed(@Query() filter: QueryBoardgamesDto) {
    return await this.boardgamesService.getBoardgamesFilteredTop(filter);
  }

  @Get()
  async findAll(@Query() filter: QueryBoardgamesDto) {
    return await this.boardgamesService.getBoardgamesFilteredPaginated(filter, {
      currentPage: filter.page,
      limit: 50,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.boardgamesService.getBoardgame(+id);
  }

  @Post()
  @UseInterceptors(new SerializeInterceptor(CreateBoardgameDto))
  async create(@Body() createBoardgameDto: CreateBoardgameDto) {
    return await this.boardgamesService.createBoardgame(createBoardgameDto);
  }

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

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: number) {
    const result = await this.boardgamesService.removeBoardgame(id);

    if (result.affected !== 1) {
      throw new NotFoundException();
    }
  }
}
