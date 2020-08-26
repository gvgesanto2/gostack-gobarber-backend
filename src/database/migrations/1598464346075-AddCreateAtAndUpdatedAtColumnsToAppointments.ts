import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddCreateAtAndUpdatedAtColumnsToAppointments1598464346075
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('appointments', [
      new TableColumn({
        name: 'createdAt',
        type: 'timestamp',
        default: 'now()',
      }),
      new TableColumn({
        name: 'updatedAt',
        type: 'timestamp',
        default: 'now()',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'updatedAt');
    await queryRunner.dropColumn('appointments', 'createdAt');
  }
}
