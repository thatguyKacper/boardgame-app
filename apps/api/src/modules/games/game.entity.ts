import { Expose, Type } from 'class-transformer';
import { Column, Entity, PrimaryColumn, ManyToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { UserDto } from '../users/dtos/user.dto';

@Entity()
export class Game {
  @PrimaryColumn()
  @Expose()
  id: number;
  @Column()
  @Expose()
  name: string;
  @Column('text', {
    array: true,
  })
  @Expose()
  designer: string[];
  @Column('text', {
    array: true,
  })
  @Expose()
  artist: string[];
  @Column()
  @Expose()
  yearpublished: number;
  @Column()
  @Expose()
  minplayers: number;
  @Column()
  @Expose()
  maxplayers: number;
  @Column()
  @Expose()
  minage: number;
  @Column()
  @Expose()
  playingtime: number;
  @Column('text', {
    array: true,
  })
  @Expose()
  publisher: string[];
  @Column('text', {
    array: true,
  })
  @Expose()
  category: string[];
  @Column('text', {
    array: true,
  })
  @Expose()
  mechanic: string[];
  @Column()
  @Expose()
  bggurl: string;
  @ManyToMany(() => User, (user) => user.played, { nullable: true })
  @Type(() => UserDto)
  @Expose()
  playedby: User[];
  @ManyToMany(() => User, (user) => user.wanttoplay, { nullable: true })
  @Type(() => UserDto)
  @Expose()
  wanttoplay: User[];
}
