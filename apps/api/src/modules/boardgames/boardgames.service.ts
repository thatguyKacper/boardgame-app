import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Boardgames } from './entities/boardgames.entity';
import { Repository } from 'typeorm';
import { CreateBoardgameDto } from './dtos/create-boardgame.dto';
import { UpdateBoardgameDto } from './dtos/update-boardgame.dto';
import { FilterBoardgameDto } from './dtos/filter-boardgame.dto';

@Injectable()
export class BoardgamesService {
  private readonly logger = new Logger(BoardgamesService.name);

  constructor(
    @InjectRepository(Boardgames)
    private readonly boardgamesRepository: Repository<Boardgames>,
  ) {}

  // async findAll() {
  //   const { page, limit } = paginationQueryDto;

  //   const [result, total] = await this.boardgamesRepository.findAndCount({
  //     // relations: ['playedbyusers', 'userswanttoplay'],
  //     take: limit,
  //     skip: (page - 1) * limit,
  //     order: {
  //       id: 'ASC',
  //     },
  //   });

  //   return {
  //     data: result,
  //     meta: {
  //       page,
  //       total,
  //       last_page: Math.ceil(total / limit),
  //     },
  //   };
  // }

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
    const game = await this.getBoardgame(id);

    if (game) {
      this.boardgamesRepository.remove(game);
    }

    return null;
  }

  // Query builder aproach

  private getBoardgameBaseQuery() {
    return this.boardgamesRepository
      .createQueryBuilder('bg')
      .orderBy('bg.id', 'DESC')
      .limit(50);
  }

  public getBoardgamesWithUsersCount() {
    return this.getBoardgameBaseQuery().loadRelationCountAndMap(
      'bg.playedbyusersCount',
      'bg.playedbyusers',
    );
  }

  public async getBoardgame(id: number): Promise<Boardgames | undefined> {
    const query = this.getBoardgamesWithUsersCount().andWhere('bg.id = :id', {
      id,
    });

    if (!query) {
      throw new NotFoundException(`Boardgame #${id} not found`);
    }

    return await query.getOne();
  }

  public async getBoardgamesFiltered(filter?: FilterBoardgameDto) {
    let query = this.getBoardgameBaseQuery();

    if (!filter) {
      return query.getMany();
    }

    if (filter.name) {
      query = query.andWhere('bg.name ILIKE :name', {
        name: `%${filter.name}%`,
      });
    }

    if (filter.designer) {
      query = query.andWhere('bg.designer ILIKE :designer', {
        designer: `%${filter.designer}%`,
      });
    }

    if (filter.artist) {
      query = query.andWhere('bg.artist ILIKE :artist', {
        artist: `%${filter.artist}%`,
      });
    }

    if (filter.yearpublished) {
      query = query.andWhere('bg.yearpublished ILIKE :yearpublished', {
        yearpublished: `%${filter.yearpublished}%`,
      });
    }

    if (filter.minplayers) {
      query = query.andWhere('bg.minplayers ILIKE :minplayers', {
        minplayers: `%${filter.minplayers}%`,
      });
    }

    if (filter.playingtime) {
      query = query.andWhere('bg.playingtime ILIKE :playingtime', {
        playingtime: `%${filter.playingtime}%`,
      });
    }

    if (filter.publisher) {
      query = query.andWhere('bg.publisher ILIKE :publisher', {
        publisher: `%${filter.publisher}%`,
      });
    }

    if (filter.category) {
      query = query.andWhere('bg.category ILIKE :category', {
        category: `%${filter.category}%`,
      });
    }

    if (filter.mechanic) {
      query = query.andWhere('bg.mechanic ILIKE :mechanic', {
        mechanic: `%${filter.mechanic}%`,
      });
    }

    return await query.getMany();
  }
}
