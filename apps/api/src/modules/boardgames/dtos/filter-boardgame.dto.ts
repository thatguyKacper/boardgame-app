import { PartialType } from '@nestjs/mapped-types';
import { CreateBoardgameDto } from './create-boardgame.dto';
export class FilterBoardgameDto extends PartialType(CreateBoardgameDto) {}
