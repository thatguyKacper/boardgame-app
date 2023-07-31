import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { UserDto } from './dtos/user.dto';
import { PaginatorOptions, paginate } from 'src/common/paginator';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  private getUsersBaseQuery() {
    return this.usersRepository
      .createQueryBuilder('u')
      .loadRelationCountAndMap('u.usersscoredCount', 'u.score')
      .loadRelationCountAndMap('u.playedboardgamesCount', 'u.playedboardgames')
      .loadRelationCountAndMap(
        'u.wanttoplayboardgamesCount',
        'u.wanttoplayboardgames',
      );
  }

  public async getUser(id: number): Promise<Users | undefined> {
    const query = this.getUsersBaseQuery()
      .leftJoinAndSelect('u.score', 'score')
      .leftJoinAndSelect('u.playedboardgames', 'playedboardgames')
      .leftJoinAndSelect('u.wanttoplayboardgames', 'wanttoplayboardgames')
      .andWhere('u.id = :id', {
        id,
      });

    if (!query) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return await query.getOne();
  }

  public async getUsersFiltered(filter?: UserDto) {
    let query = this.getUsersBaseQuery();

    if (!filter) {
      return query;
    }

    if (filter.email) {
      query = query.andWhere('u.email = :email', {
        email: filter.email,
      });
    }

    return query;
  }

  public async getUsersFilteredPaginated(
    filter: UserDto,
    paginatorOptions: PaginatorOptions,
  ) {
    return await paginate(
      await this.getUsersFiltered(filter),
      paginatorOptions,
    );
  }
}
