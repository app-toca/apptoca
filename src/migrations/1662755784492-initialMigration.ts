import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1662755784492 implements MigrationInterface {
    name = 'initialMigration1662755784492'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meetings" DROP COLUMN "date_time"`);
        await queryRunner.query(`ALTER TABLE "meetings" ADD "date_time" date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meetings" DROP COLUMN "date_time"`);
        await queryRunner.query(`ALTER TABLE "meetings" ADD "date_time" TIMESTAMP WITH TIME ZONE NOT NULL`);
    }

}
