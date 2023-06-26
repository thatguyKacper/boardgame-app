import { Exclude, Expose, Type } from 'class-transformer';
import { Game } from '../games/game.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { GameDto } from '../games/dtos/game.dto';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column()
  @Expose()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @JoinTable({
    name: 'users_played_games',
    joinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'gameId',
      referencedColumnName: 'id',
    },
  })
  @ManyToMany(() => Game, (game) => game.playedby, {
    cascade: true,
    nullable: true,
  })
  @Type(() => GameDto)
  @Expose()
  played: Game[];

  @JoinTable({
    name: 'users_wanttoplay_games',
    joinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'gameId',
      referencedColumnName: 'id',
    },
  })
  @ManyToMany(() => Game, (game) => game.wanttoplay, {
    cascade: true,
    nullable: true,
  })
  @Type(() => GameDto)
  @Expose()
  wanttoplay: Game[];
}
