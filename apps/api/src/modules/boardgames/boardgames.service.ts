import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Boardgames } from './entities/boardgames.entity';
import { Repository } from 'typeorm';
import { CreateBoardgameDto } from './dtos/create-boardgame.dto';
import { UpdateBoardgameDto } from './dtos/update-boardgame.dto';

@Injectable()
export class BoardgamesService {
  private readonly logger = new Logger(BoardgamesService.name);

  constructor(
    @InjectRepository(Boardgames)
    private readonly boardgamesRepository: Repository<Boardgames>,
  ) {}

  findAll() {
    return this.boardgamesRepository.find({
      relations: ['playedbyusers', 'userswanttoplay'],
    });
  }

  async findOne(id: number) {
    const game = await this.boardgamesRepository.findOne({
      where: {
        id,
      },
      relations: ['playedbyusers', 'userswanttoplay'],
    });

    if (!game) {
      throw new NotFoundException(`Boardgame #${id} not found`);
    }

    return game;
  }

  create(createBoardgameDto: CreateBoardgameDto) {
    const game = this.boardgamesRepository.create(createBoardgameDto);

    return this.boardgamesRepository.save(game);
  }

  async update(id: string, updateBoardgameDto: UpdateBoardgameDto) {
    const game = await this.boardgamesRepository.preload({
      id: +id,
      ...updateBoardgameDto,
    });

    if (!game) {
      throw new NotFoundException(`Boardgame #${id} not found`);
    }

    return this.boardgamesRepository.save(game);
  }

  async remove(id: number) {
    const game = await this.findOne(id);

    if (game) {
      this.boardgamesRepository.remove(game);
    }

    return null;
  }
}
