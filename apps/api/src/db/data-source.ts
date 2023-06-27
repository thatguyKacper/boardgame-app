import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { User } from 'src/modules/users/user.entity';
import { Game } from 'src/modules/games/game.entity';
import { InitialMigration1687361085225 } from './migrations/1687361085225-migrations';
import { PopulateGamesMigration1687422490595 } from './migrations/1687422490595-migrations';
import { join } from 'path';

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
  entities: [User, Game],
  synchronize: false,
  migrations: [
    InitialMigration1687361085225,
    PopulateGamesMigration1687422490595,
  ],
};

export const dataSource = new DataSource(dataSourceOptions);
