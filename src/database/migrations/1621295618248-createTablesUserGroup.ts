import {MigrationInterface, QueryRunner} from "typeorm";

export class createTablesUserGroup1621295618248 implements MigrationInterface {
    name = 'createTablesUserGroup1621295618248'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_groups" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "group_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4644edf515e3c0b88e988522588" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4c4a5923bbe3439dfc72dcfef4" ON "users_groups" ("user_id", "group_id") `);
        await queryRunner.query(`ALTER TABLE "users_groups" ADD CONSTRAINT "FK_3f4a7469c59e1c47a02a4f9ac50" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_groups" ADD CONSTRAINT "FK_d665a3539878a2669c5ff26966c" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_groups" DROP CONSTRAINT "FK_d665a3539878a2669c5ff26966c"`);
        await queryRunner.query(`ALTER TABLE "users_groups" DROP CONSTRAINT "FK_3f4a7469c59e1c47a02a4f9ac50"`);
        await queryRunner.query(`DROP INDEX "IDX_4c4a5923bbe3439dfc72dcfef4"`);
        await queryRunner.query(`DROP TABLE "users_groups"`);
    }

}
