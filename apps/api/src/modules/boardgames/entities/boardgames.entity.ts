import { Expose, Type } from 'class-transformer';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from '../../users/entities/users.entity';
import { UserDto } from '../../users/dtos/user.dto';

@Entity()
export class Boardgames {
  @PrimaryGeneratedColumn()
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
  @ManyToMany(() => Users, (user) => user.playedboardgames, { nullable: true })
  @Type(() => UserDto)
  @Expose()
  playedbyusers: Users[];
  @ManyToMany(() => Users, (user) => user.wanttoplayboardgames, {
    nullable: true,
  })
  @Type(() => UserDto)
  @Expose()
  userswanttoplay: Users[];
}
