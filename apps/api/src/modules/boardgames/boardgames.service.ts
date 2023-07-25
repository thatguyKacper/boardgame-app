import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Boardgames } from './entities/boardgames.entity';
import { Repository } from 'typeorm';
import { CreateBoardgameDto } from './dtos/create-boardgame.dto';
import { UpdateBoardgameDto } from './dtos/update-boardgame.dto';
import { PaginatorOptions, paginate } from 'src/common/paginator';
import { QueryBoardgamesDto } from './dtos/query-boardgames.dto';
import { Users } from '../users/entities/users.entity';

@Injectable()
export class BoardgamesService {
  private readonly logger = new Logger(BoardgamesService.name);

  constructor(
    @InjectRepository(Boardgames)
    private readonly boardgamesRepository: Repository<Boardgames>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  private getBoardgamesBaseQuery() {
    return this.boardgamesRepository
      .createQueryBuilder('bg')
      .loadRelationCountAndMap('bg.usersscoredCount', 'bg.usersscored')
      .loadRelationCountAndMap('bg.playedbyusersCount', 'bg.playedbyusers')
      .loadRelationCountAndMap('bg.userswanttoplayCount', 'bg.userswanttoplay');
  }

  private getUsersBaseQuery() {
    return this.usersRepository.createQueryBuilder('u');
  }

  public async createBoardgame(createBoardgameDto: CreateBoardgameDto) {
    return await this.getBoardgamesBaseQuery()
      .insert()
      .into(Boardgames)
      .values(createBoardgameDto)
      .execute();
  }

  public async updateBoardgame(
    id: string,
    updateBoardgameDto?: UpdateBoardgameDto,
  ) {
    return await this.getBoardgamesBaseQuery()
      .update()
      .where('id = :id', { id })
      .set(updateBoardgameDto)
      .execute();
  }

  public async removeBoardgame(id: number) {
    return await this.getBoardgamesBaseQuery()
      .delete()
      .where('id = :id', { id })
      .execute();
  }

  public async getBoardgame(id: number): Promise<Boardgames | undefined> {
    const query = this.getBoardgamesBaseQuery()
      .andWhere('bg.id = :id', {
        id,
      })
      .leftJoinAndSelect('bg.usersscored', 'usersscored')
      .leftJoinAndSelect('bg.playedbyusers', 'playedbyusers')
      .leftJoinAndSelect('bg.userswanttoplay', 'userswanttoplay');

    if (!query) {
      throw new NotFoundException(`Boardgame #${id} not found`);
    }

    return await query.getOne();
  }

  public async getBoardgamesFiltered(filter?: QueryBoardgamesDto) {
    let query = this.getBoardgamesBaseQuery();

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
    let query = this.getBoardgamesBaseQuery();

    if (!filter) {
      return query;
    }

    if (filter.score) {
      query = query
        .innerJoinAndSelect('bg.usersscored', 'top')
        .loadRelationCountAndMap('bg.usersscoredCount', 'bg.usersscored');
    }

    if (filter.played) {
      query = query
        .innerJoinAndSelect('bg.playedbyusers', 'top')
        .loadRelationCountAndMap('bg.playedbyusersCount', 'bg.playedbyusers');
    }

    if (filter.wishlist) {
      query = query
        .innerJoinAndSelect('bg.userswanttoplay', 'top')
        .loadRelationCountAndMap(
          'bg.userswanttoplayCount',
          'bg.userswanttoplay',
        );
    }

    return query;
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

  public async getBoardgamesFilteredTopPaginated(
    filter: QueryBoardgamesDto,
    paginatorOptions: PaginatorOptions,
  ) {
    return await paginate(
      await this.getBoardgamesFilteredTop(filter),
      paginatorOptions,
    );
  }

  private async searchBoardgameAndUserQuery(gameId: number, userId: number) {
    const game = await this.getBoardgamesBaseQuery()
      .where('bg.id = :id', {
        id: gameId,
      })
      .getOne();

    const user = await this.getUsersBaseQuery()
      .where('u.id = :id', {
        id: userId,
      })
      .getOne();

    return { game, user };
  }

  async addAsPlayed(gameId: number, userId: number) {
    const query = await this.searchBoardgameAndUserQuery(gameId, userId);

    return await this.getBoardgamesBaseQuery()
      .relation(Boardgames, 'playedbyusers')
      .of(query.game)
      .add(query.user);
  }

  async addToWishlist(gameId: number, userId: number) {
    const query = await this.searchBoardgameAndUserQuery(gameId, userId);

    return await this.getBoardgamesBaseQuery()
      .relation(Boardgames, 'userswanttoplay')
      .of(query.game)
      .add(query.user);
  }

  // TODO add score to score column

  async addScore(gameId: number, userId: number, score: number) {
    const query = await this.searchBoardgameAndUserQuery(gameId, userId);

    return await this.getBoardgamesBaseQuery()
      .relation(Boardgames, 'usersscored')
      .of(query.game)
      .add(query.user);
  }
}
