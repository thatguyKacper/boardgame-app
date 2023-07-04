import { Exclude, Expose, Type } from 'class-transformer';
import { Boardgames } from '../../boardgames/entities/boardgames.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { BoardgameDto } from '../../boardgames/dtos/boardgame.dto';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column({ unique: true })
  @Expose()
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
  @Expose()
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
  @Expose()
  wanttoplayboardgames: Boardgames[];
}
