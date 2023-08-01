import { InjectRepository } from '@nestjs/typeorm';
import { Boardgames } from './entities/boardgames.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AddToService {
  constructor(
    @InjectRepository(Boardgames)
    private readonly boardgamesRepository: Repository<Boardgames>,
  ) {}

  private getBoardgamesBaseQuery() {
    return this.boardgamesRepository.createQueryBuilder('bg');
  }

  async addAsPlayed(gameId: number, userId: number) {
    return await this.getBoardgamesBaseQuery()
      .relation(Boardgames, 'playedbyusers')
      .of(gameId)
      .add(userId);
  }

  async addToWishlist(gameId: number, userId: number) {
    return await this.getBoardgamesBaseQuery()
      .relation(Boardgames, 'userswanttoplay')
      .of(gameId)
      .add(userId);
  }

  async removeFromAsPlayed(gameId: number, userId: number) {
    return await this.getBoardgamesBaseQuery()
      .relation(Boardgames, 'playedbyusers')
      .of(gameId)
      .remove(userId);
  }

  async removeFromWishlist(gameId: number, userId: number) {
    return await this.getBoardgamesBaseQuery()
      .relation(Boardgames, 'userswanttoplay')
      .of(gameId)
      .remove(userId);
  }
}
