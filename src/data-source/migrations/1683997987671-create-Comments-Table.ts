import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCommentsTable1683997987671 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Comments',
        columns: [
          {
            name: 'idComment',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            primaryKeyConstraintName: 'Comments_idComment_PK',
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
            name: 'idPost',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Comments');
  }
}
