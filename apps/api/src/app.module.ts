import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { dataSourceOptions } from './db/data-source';
import { UsersModule } from './modules/users/users.module';
import { BoardgamesModule } from './modules/boardgames/boardgames.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...dataSourceOptions,
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client', 'dist'),
    }),
    AuthModule,
    UsersModule,
    BoardgamesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
