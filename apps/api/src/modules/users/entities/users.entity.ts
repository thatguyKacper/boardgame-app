import { Exclude, Type } from 'class-transformer';
import { Boardgames } from '../../boardgames/entities/boardgames.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { BoardgameDto } from '../../boardgames/dtos/boardgame.dto';
import { UsersScoredBoardgames } from 'src/modules/boardgames/entities/score.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @JoinTable({
    name: 'users_played_boardgames',
    joinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'boardgameId',
      referencedColumnName: 'id',
    },
  })
  @ManyToMany(() => Boardgames, (boardgame) => boardgame.playedbyusers, {
    cascade: true,
    nullable: true,
  })
  @Type(() => BoardgameDto)
  playedboardgames: Boardgames[];

  @JoinTable({
    name: 'users_wanttoplay_boardgames',
    joinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'boardgameId',
      referencedColumnName: 'id',
    },
  })
  @ManyToMany(() => Boardgames, (boardgame) => boardgame.userswanttoplay, {
    cascade: true,
    nullable: true,
  })
  @Type(() => BoardgameDto)
  wanttoplayboardgames: Boardgames[];

  @OneToMany(() => UsersScoredBoardgames, (score) => score.user)
  score: UsersScoredBoardgames[];

  playedboardgamesCount?: number;
  wanttoplayboardgamesCount?: number;
  scoredboardgamesCount?: number;
}
