import { InjectRepository } from '@nestjs/typeorm';
import { Boardgames } from './entities/boardgames.entity';
import { Repository } from 'typeorm';
import { UsersScoredBoardgames } from './entities/score.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ScoreService {
  constructor(
    @InjectRepository(Boardgames)
    private readonly boardgamesRepository: Repository<Boardgames>,
  ) {}

  async addScore(boardgameId: number, userId: number, score: number) {
    return await this.boardgamesRepository
      .createQueryBuilder()
      .insert()
      .into(UsersScoredBoardgames)
      .values({
        boardgameId,
        userId,
        score,
      })
      .execute();
  }

  async updateScore(boardgameId: number, userId: number, score: number) {
    return await this.boardgamesRepository
      .createQueryBuilder()
      .update(UsersScoredBoardgames)
      .set({ score })
      .where('userId = :userId AND boardgameId = :boardgameId', {
        userId,
        boardgameId,
      })
      .execute();
  }

  async removeScore(boardgameId: number, userId: number) {
    return await this.boardgamesRepository
      .createQueryBuilder()
      .delete()
      .from(UsersScoredBoardgames)
      .where('userId = :userId AND boardgameId = :boardgameId', {
        userId,
        boardgameId,
      })
      .execute();
  }
}
