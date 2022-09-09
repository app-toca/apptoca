import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1662744853485 implements MigrationInterface {
    name = 'initialMigration1662744853485'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "days" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" integer NOT NULL, "scheduleId" uuid, CONSTRAINT "REL_b6c649bb2b6b935b59291942de" UNIQUE ("scheduleId"), CONSTRAINT "PK_c2c66eb46534bea34ba48cc4d7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hours" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "hour" character varying NOT NULL, "scheduleId" uuid, CONSTRAINT "REL_9f87acb65dcf37192564401c82" UNIQUE ("scheduleId"), CONSTRAINT "PK_83e53497f998d850626210539f2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "schedules" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid, "dayId" uuid, "hourId" uuid, CONSTRAINT "REL_422f864ef56abcede94cad9958" UNIQUE ("dayId"), CONSTRAINT "REL_18a2be88e8a1fcf828731a3625" UNIQUE ("hourId"), CONSTRAINT "PK_7e33fc2ea755a5765e3564e66dd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "meetings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying(500) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "date_time" TIMESTAMP WITH TIME ZONE NOT NULL, "duration" character varying NOT NULL, "ata" character varying NOT NULL, "userId" uuid, "areaId" uuid, CONSTRAINT "PK_aa73be861afa77eb4ed31f3ed57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying(1000) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "areaId" uuid, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying(500) NOT NULL, "userId" uuid, "postId" uuid, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "nickname" character varying NOT NULL, "age" integer NOT NULL, "password" character varying NOT NULL, "year" integer NOT NULL, "course" character varying(10) NOT NULL, "phrase" character varying(500) NOT NULL, "is_adm" boolean NOT NULL DEFAULT false, "is_active" boolean NOT NULL DEFAULT true, "is_owner" boolean NOT NULL DEFAULT false, "img" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "organizationId" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "organizations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_6b031fcd0863e3f6b44230163f9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "areas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "organizationId" uuid, CONSTRAINT "PK_5110493f6342f34c978c084d0d6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "area_users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "areaId" uuid, "userId" uuid, CONSTRAINT "PK_86f132aee0f081e38a0a696840d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "days" ADD CONSTRAINT "FK_b6c649bb2b6b935b59291942def" FOREIGN KEY ("scheduleId") REFERENCES "schedules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hours" ADD CONSTRAINT "FK_9f87acb65dcf37192564401c826" FOREIGN KEY ("scheduleId") REFERENCES "schedules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_19c54f24597b318be3892114c75" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_422f864ef56abcede94cad9958c" FOREIGN KEY ("dayId") REFERENCES "days"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_18a2be88e8a1fcf828731a3625d" FOREIGN KEY ("hourId") REFERENCES "hours"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meetings" ADD CONSTRAINT "FK_4b70ab8832f1d7f9a7387d14307" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meetings" ADD CONSTRAINT "FK_f7e4aea640937bd1c98736ec247" FOREIGN KEY ("areaId") REFERENCES "areas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_ae05faaa55c866130abef6e1fee" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_a900f3a743195e1770c91fd0437" FOREIGN KEY ("areaId") REFERENCES "areas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_f3d6aea8fcca58182b2e80ce979" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "areas" ADD CONSTRAINT "FK_7cb4318b44ba3feb04c7278bf98" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "area_users" ADD CONSTRAINT "FK_219f29282dd26ad309fe9ff1495" FOREIGN KEY ("areaId") REFERENCES "areas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "area_users" ADD CONSTRAINT "FK_eb6cf07c0f36f19753b1d89cb5b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "area_users" DROP CONSTRAINT "FK_eb6cf07c0f36f19753b1d89cb5b"`);
        await queryRunner.query(`ALTER TABLE "area_users" DROP CONSTRAINT "FK_219f29282dd26ad309fe9ff1495"`);
        await queryRunner.query(`ALTER TABLE "areas" DROP CONSTRAINT "FK_7cb4318b44ba3feb04c7278bf98"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_f3d6aea8fcca58182b2e80ce979"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_a900f3a743195e1770c91fd0437"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_ae05faaa55c866130abef6e1fee"`);
        await queryRunner.query(`ALTER TABLE "meetings" DROP CONSTRAINT "FK_f7e4aea640937bd1c98736ec247"`);
        await queryRunner.query(`ALTER TABLE "meetings" DROP CONSTRAINT "FK_4b70ab8832f1d7f9a7387d14307"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_18a2be88e8a1fcf828731a3625d"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_422f864ef56abcede94cad9958c"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_19c54f24597b318be3892114c75"`);
        await queryRunner.query(`ALTER TABLE "hours" DROP CONSTRAINT "FK_9f87acb65dcf37192564401c826"`);
        await queryRunner.query(`ALTER TABLE "days" DROP CONSTRAINT "FK_b6c649bb2b6b935b59291942def"`);
        await queryRunner.query(`DROP TABLE "area_users"`);
        await queryRunner.query(`DROP TABLE "areas"`);
        await queryRunner.query(`DROP TABLE "organizations"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP TABLE "meetings"`);
        await queryRunner.query(`DROP TABLE "schedules"`);
        await queryRunner.query(`DROP TABLE "hours"`);
        await queryRunner.query(`DROP TABLE "days"`);
    }

}
