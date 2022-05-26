import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1653532498506 implements MigrationInterface {
    name = 'initialMigration1653532498506'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dvd_stocks" ("stock_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "price" double precision NOT NULL, CONSTRAINT "PK_7ad472ec456d2efa9ec0d130e25" PRIMARY KEY ("stock_id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "is_admin" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_51b8b26ac168fbe7d6f5653e6cf" UNIQUE ("name"), CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("order_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "total" double precision NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "userUserId" uuid, CONSTRAINT "PK_cad55b3cb25b38be94d2ce831db" PRIMARY KEY ("order_id"))`);
        await queryRunner.query(`CREATE TABLE "dvds" ("dvd_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "duration" character varying NOT NULL, CONSTRAINT "PK_008c655f5cd180c622893c4f868" PRIMARY KEY ("dvd_id"))`);
        await queryRunner.query(`CREATE TABLE "carts" ("cart_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "paid" boolean NOT NULL DEFAULT false, "total" double precision NOT NULL, CONSTRAINT "PK_2fb47cbe0c6f182bb31c66689e9" PRIMARY KEY ("cart_id"))`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_6a4ebad71685a4ed11e89b3e834" FOREIGN KEY ("userUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_6a4ebad71685a4ed11e89b3e834"`);
        await queryRunner.query(`DROP TABLE "carts"`);
        await queryRunner.query(`DROP TABLE "dvds"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "dvd_stocks"`);
    }

}
