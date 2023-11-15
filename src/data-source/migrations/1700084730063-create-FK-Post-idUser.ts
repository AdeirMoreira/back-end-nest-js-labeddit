import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class CreateFKPostIdUser1700084730063 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'Posts',
      new TableForeignKey({
        name: 'Posts_Users_idUser_FK',
        columnNames: ['idUser'],
        referencedTableName: 'Users',
        referencedColumnNames: ['idUser'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('Posts', 'Posts_Users_idUser_FK');
  }
}
