import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1662851126965 implements MigrationInterface {
    name = 'initialMigration1662851126965'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying(50) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "postId" uuid, CONSTRAINT "PK_0b213d460d0c473bc2fb6ee27f3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "meetings" DROP COLUMN "date_time"`);
        await queryRunner.query(`ALTER TABLE "meetings" ADD "date_time" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_19c54f24597b318be3892114c75"`);
        await queryRunner.query(`ALTER TABLE "meetings" DROP CONSTRAINT "FK_4b70ab8832f1d7f9a7387d14307"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_ae05faaa55c866130abef6e1fee"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`ALTER TABLE "area_users" DROP CONSTRAINT "FK_eb6cf07c0f36f19753b1d89cb5b"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_19c54f24597b318be3892114c75" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meetings" ADD CONSTRAINT "FK_4b70ab8832f1d7f9a7387d14307" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reactions" ADD CONSTRAINT "FK_f3e1d278edeb2c19a2ddad83f8e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reactions" ADD CONSTRAINT "FK_d9628397382a90981e26a915bc9" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_ae05faaa55c866130abef6e1fee" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "area_users" ADD CONSTRAINT "FK_eb6cf07c0f36f19753b1d89cb5b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "area_users" DROP CONSTRAINT "FK_eb6cf07c0f36f19753b1d89cb5b"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_ae05faaa55c866130abef6e1fee"`);
        await queryRunner.query(`ALTER TABLE "reactions" DROP CONSTRAINT "FK_d9628397382a90981e26a915bc9"`);
        await queryRunner.query(`ALTER TABLE "reactions" DROP CONSTRAINT "FK_f3e1d278edeb2c19a2ddad83f8e"`);
        await queryRunner.query(`ALTER TABLE "meetings" DROP CONSTRAINT "FK_4b70ab8832f1d7f9a7387d14307"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_19c54f24597b318be3892114c75"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "area_users" ADD CONSTRAINT "FK_eb6cf07c0f36f19753b1d89cb5b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_ae05faaa55c866130abef6e1fee" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meetings" ADD CONSTRAINT "FK_4b70ab8832f1d7f9a7387d14307" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_19c54f24597b318be3892114c75" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meetings" DROP COLUMN "date_time"`);
        await queryRunner.query(`ALTER TABLE "meetings" ADD "date_time" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`DROP TABLE "reactions"`);
    }

}
