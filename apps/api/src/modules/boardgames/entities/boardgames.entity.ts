import { Type } from 'class-transformer';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from '../../users/entities/users.entity';
import { UserDto } from '../../users/dtos/user.dto';
import { UsersScoredBoardgames } from './score.entity';

@Entity()
export class Boardgames {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column('text', {
    array: true,
  })
  designer: string[];
  @Column('text', {
    array: true,
  })
  artist: string[];
  @Column()
  yearpublished: number;
  @Column()
  minplayers: number;
  @Column()
  maxplayers: number;
  @Column()
  minage: number;
  @Column()
  playingtime: number;
  @Column('text', {
    array: true,
  })
  publisher: string[];
  @Column('text', {
    array: true,
  })
  category: string[];
  @Column('text', {
    array: true,
  })
  mechanic: string[];
  @Column()
  bggurl: string;
  @ManyToMany(() => Users, (user) => user.playedboardgames, { nullable: true })
  @Type(() => UserDto)
  playedbyusers: Users[];
  @ManyToMany(() => Users, (user) => user.wanttoplayboardgames, {
    nullable: true,
  })
  @Type(() => UserDto)
  userswanttoplay: Users[];

  @OneToMany(() => UsersScoredBoardgames, (score) => score.boardgame)
  score: UsersScoredBoardgames[];

  playedbyusersCount?: number;
  userswanttoplayCount?: number;
  usersscoredCount?: number;
}
