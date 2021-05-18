import {MigrationInterface, QueryRunner} from "typeorm";

export class createTablesUsers1621294845818 implements MigrationInterface {
    name = 'createTablesUsers1621294845818'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "phone" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
     
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
