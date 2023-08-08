import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { UserDto } from './dtos/user.dto';
import { PaginatorOptions, paginate } from 'src/common/paginator';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  private applySorting(
    query: SelectQueryBuilder<any>,
    sortBy: string,
    sortOrder: 'ASC' | 'DESC',
  ) {
    if (sortBy && sortOrder) {
      query = query.orderBy(`u.${sortBy}`, sortOrder);
    }
    return query;
  }

  public async createUser(createUserDto: CreateUserDto) {
    return await this.usersRepository
      .createQueryBuilder()
      .insert()
      .into(Users)
      .values([
        { email: createUserDto.email, password: createUserDto.password },
      ])
      .returning(['id', 'email'])
      .execute();
  }

  public async updateUser(updateUserDto: UpdateUserDto, id: number) {
    return await this.usersRepository
      .createQueryBuilder()
      .update(Users)
      .set({ password: updateUserDto.password })
      .where('id = :id', { id })
      .execute();
  }

  public async removeUser(id: number) {
    return await this.usersRepository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();
  }

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

  public async getUserWithEmail(email: string): Promise<Users | undefined> {
    const query = this.usersRepository
      .createQueryBuilder('u')
      .andWhere('u.email = :email', {
        email,
      });

    if (!query) {
      throw new NotFoundException(`User #${email} not found`);
    }

    return await query.getOne();
  }

  public getUsersFiltered(filter?: UserDto) {
    let query = this.getUsersBaseQuery();

    if (!filter) {
      return query;
    }

    if (filter.email) {
      query = query.andWhere('u.email = :email', {
        email: filter.email,
      });
    }

    query = this.applySorting(query, filter.sortBy, filter.sortOrder);

    return query;
  }

  public async getUsersFilteredPaginated(
    filter: UserDto,
    paginatorOptions: PaginatorOptions,
  ) {
    return await paginate(this.getUsersFiltered(filter), paginatorOptions);
  }
}
