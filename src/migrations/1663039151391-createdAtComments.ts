import { MigrationInterface, QueryRunner } from "typeorm";

export class createdAtComments1663039151391 implements MigrationInterface {
    name = 'createdAtComments1663039151391'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "created_at"`);
    }

}
