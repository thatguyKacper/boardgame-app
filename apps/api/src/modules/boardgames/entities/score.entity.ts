import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Users } from '../../users/entities/users.entity';
import { Boardgames } from './boardgames.entity';

@Entity()
export class UsersScoredBoardgames {
  @PrimaryGeneratedColumn()
  @Exclude()
  @Unique(['id'])
  id: number;

  @Column()
  userId: number;

  @Column()
  boardgameId: number;

  @Column()
  score: number;

  @ManyToOne(() => Users, (user) => user.score)
  user: Users;

  @ManyToOne(() => Boardgames, (boardgame) => boardgame.score)
  boardgame: Boardgames;
}
