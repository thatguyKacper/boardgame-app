import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Boardgames } from './entities/boardgames.entity';
import { BoardgamesController } from './boardgames.controller';
import { BoardgamesService } from './boardgames.service';
import { Users } from '../users/entities/users.entity';
import { UsersScoredBoardgames } from './entities/score.entity';
import { ScoreService } from './score.service';
import { ScoreController } from './score.controller';
import { AddToController } from './add-to.controller';
import { AddToService } from './add-to.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Boardgames, Users, UsersScoredBoardgames]),
  ],
  controllers: [BoardgamesController, ScoreController, AddToController],
  providers: [BoardgamesService, ScoreService, AddToService],
})
export class BoardgamesModule {}
