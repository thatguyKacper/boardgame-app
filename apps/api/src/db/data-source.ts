import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { Users } from 'src/modules/users/entities/users.entity';
import { Boardgames } from 'src/modules/boardgames/entities/boardgames.entity';
import { InitialMigration1687361085225 } from './migrations/1687361085225-migrations';
import { PopulateGamesMigration1687422490595 } from './migrations/1687422490595-migrations';
import { join } from 'path';
import { UsersScoredBoardgames } from 'src/modules/boardgames/entities/score.entity';

config({
  path: join(__dirname, '../../../..', '.env'),
});

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  entities: [Users, Boardgames, UsersScoredBoardgames],
  synchronize: false,
  migrations: [
    InitialMigration1687361085225,
    PopulateGamesMigration1687422490595,
  ],
};

export const dataSource = new DataSource(dataSourceOptions);
