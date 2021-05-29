import {MigrationInterface, QueryRunner} from "typeorm";

export class migrateTableUsers1621974282182 implements MigrationInterface {
    name = 'migrateTableUsers1621974282182'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" character varying NOT NULL, "name" character varying NOT NULL, "phone" character varying NOT NULL, "password" character varying NOT NULL, "is_online" boolean NOT NULL DEFAULT true, "last_access_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
