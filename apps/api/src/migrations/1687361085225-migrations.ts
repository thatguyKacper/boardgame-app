import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class InitialMigration1687361085225 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'boardgames',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'designer',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'artist',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'yearpublished',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'minplayers',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'maxplayers',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'minage',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'playingtime',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'publisher',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'category',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'mechanic',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'bggurl',
            type: 'varchar',
            isNullable: false,
          },
        ],
      }),
    );
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'text',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'users_played_games',
        columns: [
          {
            name: 'userId',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'gameId',
            type: 'int',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createPrimaryKey('users_played_games', [
      'userId',
      'gameId',
    ]);

    await queryRunner.createForeignKeys('users_played_games', [
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
      }),
      new TableForeignKey({
        columnNames: ['gameId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'games',
      }),
    ]);

    await queryRunner.createTable(
      new Table({
        name: 'users_wanttoplay_games',
        columns: [
          {
            name: 'userId',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'gameId',
            type: 'int',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createPrimaryKey('users_wanttoplay_games', [
      'userId',
      'gameId',
    ]);

    await queryRunner.createForeignKeys('users_wanttoplay_games', [
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
      }),
      new TableForeignKey({
        columnNames: ['gameId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'games',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //
  }
}