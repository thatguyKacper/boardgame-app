import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Boardgames } from './entities/boardgames.entity';
import { Repository } from 'typeorm';
import { CreateBoardgameDto } from './dtos/create-boardgame.dto';
import { UpdateBoardgameDto } from './dtos/update-boardgame.dto';
import { PaginatorOptions, paginate } from 'src/common/paginator';
import { QueryBoardgamesDto } from './dtos/query-boardgames.dto';

@Injectable()
export class BoardgamesService {
  private readonly logger = new Logger(BoardgamesService.name);

  constructor(
    @InjectRepository(Boardgames)
    private readonly boardgamesRepository: Repository<Boardgames>,
  ) {}

  public async createBoardgame(createBoardgameDto: CreateBoardgameDto) {
    return await this.boardgamesRepository
      .createQueryBuilder('bg')
      .insert()
      .into(Boardgames)
      .values(createBoardgameDto)
      .execute();
  }

  public async updateBoardgame(
    id: string,
    updateBoardgameDto?: UpdateBoardgameDto,
  ) {
    return await this.boardgamesRepository
      .createQueryBuilder('bg')
      .update()
      .where('id = :id', { id })
      .set(updateBoardgameDto)
      .execute();
  }

  public async removeBoardgame(id: number) {
    return await this.boardgamesRepository
      .createQueryBuilder('bg')
      .delete()
      .where('id = :id', { id })
      .execute();
  }

  private getBoardgameBaseQuery() {
    return this.boardgamesRepository
      .createQueryBuilder('bg')
      .orderBy('bg.id', 'DESC');
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

  public async getBoardgamesFiltered(filter?: QueryBoardgamesDto) {
    let query = this.getBoardgameBaseQuery();

    if (!filter) {
      return query;
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
      query = query.andWhere('bg.yearpublished = :yearpublished', {
        yearpublished: `${filter.yearpublished}`,
      });
    }

    if (filter.minplayers) {
      query = query.andWhere('bg.minplayers = :minplayers', {
        minplayers: `${filter.minplayers}`,
      });
    }

    if (filter.maxplayers) {
      query = query.andWhere('bg.maxplayers = :maxplayers', {
        maxplayers: `${filter.maxplayers}`,
      });
    }

    if (filter.minage) {
      query = query.andWhere('bg.minage = :minage', {
        minage: `${filter.minage}`,
      });
    }

    if (filter.playingtime) {
      query = query.andWhere('bg.playingtime = :playingtime', {
        playingtime: `${filter.playingtime}`,
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

    return query;
  }

  public async getBoardgamesFilteredTop(filter?: QueryBoardgamesDto) {
    let query = this.getBoardgameBaseQuery();

    if (!filter) {
      return query;
    }

    if (filter.score) {
      query = query
        .innerJoinAndSelect('bg.score', 'top')
        .orderBy('top', 'ASC')
        .limit(10)
        .loadRelationCountAndMap('bg.playedbyusersCount', 'bg.playedbyusers');
    }

    if (filter.played) {
      query = query
        .innerJoinAndSelect('bg.playedbyusers', 'top')
        .orderBy('top', 'ASC')
        .limit(10)
        .loadRelationCountAndMap('bg.playedbyusersCount', 'bg.playedbyusers');
    }

    if (filter.wishlist) {
      query = query
        .innerJoinAndSelect('bg.userswanttoplay', 'top')
        .orderBy('top', 'ASC')
        .limit(10)
        .loadRelationCountAndMap(
          'bg.userswanttoplayCount',
          'bg.userswanttoplay',
        );
    }

    return {
      data: await query.getMany(),
    };
  }

  public async getBoardgamesFilteredPaginated(
    filter: QueryBoardgamesDto,
    paginatorOptions: PaginatorOptions,
  ) {
    return await paginate(
      await this.getBoardgamesFiltered(filter),
      paginatorOptions,
    );
  }
}
