import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreatePostsTable1683996086303 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Posts',
        columns: [
          {
            name: 'idPost',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            primaryKeyConstraintName: 'Posts_idPost_PK',
          },
          {
            name: 'titulo',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'conteudo',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'idUser',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'datetime',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'datetime',
            default: 'now()',
          },
          {
            name: 'deletedAt',
            type: 'datetime',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'Posts',
      new TableForeignKey({
        referencedTableName: 'Users',
        referencedColumnNames: ['idUser'],
        columnNames: ['idUser'],
        name: 'Post_Users_idUser_FK',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('Posts', 'Post_Users_idUser_FK');
    await queryRunner.dropTable('Posts');
  }
}
