import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
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
      currentPage: 1,
      limit: 50,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.boardgamesService.getBoardgame(+id);
  }

  @Post()
  @UseInterceptors(new SerializeInterceptor(CreateBoardgameDto))
  create(@Body() createBoardgameDto: CreateBoardgameDto) {
    return this.boardgamesService.create(createBoardgameDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBoardgameDto: UpdateBoardgameDto,
  ) {
    return this.boardgamesService.update(id, updateBoardgameDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: number) {
    return this.boardgamesService.remove(id);
  }
}
