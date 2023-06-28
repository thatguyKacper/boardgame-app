import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { BoardgamesService } from './boardgames.service';
import { CreateBoardgameDto } from './dtos/create-boardgame.dto';
import { UpdateBoardgameDto } from './dtos/update-boardgame.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto/pagination-query.dto';

@Controller('boardgames')
@SerializeOptions({ strategy: 'excludeAll' })
@UseInterceptors(ClassSerializerInterceptor)
export class BoardgamesController {
  constructor(private readonly boardgamesService: BoardgamesService) {}

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.boardgamesService.findOne(+id);
  }

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.boardgamesService.findAll(paginationQuery);
  }

  @Post()
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
