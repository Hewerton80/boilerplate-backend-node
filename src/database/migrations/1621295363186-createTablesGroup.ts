import {MigrationInterface, QueryRunner} from "typeorm";

export class createTablesGroup1621295363186 implements MigrationInterface {
    name = 'createTablesGroup1621295363186'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "groups" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "author_id" uuid NOT NULL, "name" character varying NOT NULL, "is_private" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_659d1483316afb28afd3a90646e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "groups" ADD CONSTRAINT "FK_871a480470d29e8a18df50cd78b" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groups" DROP CONSTRAINT "FK_871a480470d29e8a18df50cd78b"`);
        await queryRunner.query(`DROP TABLE "groups"`);

    }

}
