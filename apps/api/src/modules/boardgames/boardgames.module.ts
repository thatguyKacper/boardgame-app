import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Boardgames } from './entities/boardgames.entity';
import { BoardgamesController } from './boardgames.controller';
import { BoardgamesService } from './boardgames.service';
import { Users } from '../users/entities/users.entity';
import { UsersScoredBoardgames } from './entities/score.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Boardgames, Users, UsersScoredBoardgames]),
  ],
  controllers: [BoardgamesController],
  providers: [BoardgamesService],
})
export class BoardgamesModule {}
