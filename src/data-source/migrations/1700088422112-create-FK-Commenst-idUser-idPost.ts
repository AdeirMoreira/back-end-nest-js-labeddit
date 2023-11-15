import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class CreateFKCommenstIdUserIdPost1700088422112
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'Comments',
      new TableForeignKey({
        referencedTableName: 'Users',
        referencedColumnNames: ['idUser'],
        columnNames: ['idUser'],
        name: 'Comments_Users_idUser_FK',
      }),
    );

    await queryRunner.createForeignKey(
      'Comments',
      new TableForeignKey({
        referencedTableName: 'Posts',
        referencedColumnNames: ['idPost'],
        columnNames: ['idPost'],
        name: 'Comments_Post_idPost_FK',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('Comments', 'Comments_Users_idUser_FK');
    await queryRunner.dropForeignKey('Comments', 'Comments_Post_idPost_FK');
  }
}
