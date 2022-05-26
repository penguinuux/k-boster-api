import { hashSync } from "bcrypt";
import { MigrationInterface, QueryRunner } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

export class initialMigration1653572793016 implements MigrationInterface {
  name = "initialMigration1653572793016";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "dvd_stocks" ("stock_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "price" double precision NOT NULL, CONSTRAINT "PK_7ad472ec456d2efa9ec0d130e25" PRIMARY KEY ("stock_id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "is_admin" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_51b8b26ac168fbe7d6f5653e6cf" UNIQUE ("name"), CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "orders" ("order_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "total" double precision NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "userUserId" uuid, CONSTRAINT "PK_cad55b3cb25b38be94d2ce831db" PRIMARY KEY ("order_id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "dvds" ("dvd_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "duration" character varying NOT NULL, "dvdStockStockId" uuid, CONSTRAINT "REL_0fe076da0979beec634af357ce" UNIQUE ("dvdStockStockId"), CONSTRAINT "PK_008c655f5cd180c622893c4f868" PRIMARY KEY ("dvd_id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "carts" ("cart_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "paid" boolean NOT NULL DEFAULT false, "total" double precision NOT NULL, "userUserId" uuid, CONSTRAINT "REL_b50e2403bed7d7f56a098ef7df" UNIQUE ("userUserId"), CONSTRAINT "PK_2fb47cbe0c6f182bb31c66689e9" PRIMARY KEY ("cart_id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "orders_dvds_dvds" ("ordersOrderId" uuid NOT NULL, "dvdsDvdId" uuid NOT NULL, CONSTRAINT "PK_4eef2b194481a0aa7fdded6f5d3" PRIMARY KEY ("ordersOrderId", "dvdsDvdId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_704d97cc8ad00bbc40d5e6986b" ON "orders_dvds_dvds" ("ordersOrderId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a2c060b5af9e9db8306a705e0c" ON "orders_dvds_dvds" ("dvdsDvdId") `
    );
    await queryRunner.query(
      `CREATE TABLE "carts_dvds_dvds" ("cartsCartId" uuid NOT NULL, "dvdsDvdId" uuid NOT NULL, CONSTRAINT "PK_56d4abfdb8ef185d7514a72cbe7" PRIMARY KEY ("cartsCartId", "dvdsDvdId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e7b1a7565ae88a31828e5027b6" ON "carts_dvds_dvds" ("cartsCartId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_04991af98396ab0bbb8ccbc7d6" ON "carts_dvds_dvds" ("dvdsDvdId") `
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_6a4ebad71685a4ed11e89b3e834" FOREIGN KEY ("userUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "dvds" ADD CONSTRAINT "FK_0fe076da0979beec634af357ce9" FOREIGN KEY ("dvdStockStockId") REFERENCES "dvd_stocks"("stock_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "carts" ADD CONSTRAINT "FK_b50e2403bed7d7f56a098ef7df4" FOREIGN KEY ("userUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "orders_dvds_dvds" ADD CONSTRAINT "FK_704d97cc8ad00bbc40d5e6986b7" FOREIGN KEY ("ordersOrderId") REFERENCES "orders"("order_id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "orders_dvds_dvds" ADD CONSTRAINT "FK_a2c060b5af9e9db8306a705e0c2" FOREIGN KEY ("dvdsDvdId") REFERENCES "dvds"("dvd_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "carts_dvds_dvds" ADD CONSTRAINT "FK_e7b1a7565ae88a31828e5027b6e" FOREIGN KEY ("cartsCartId") REFERENCES "carts"("cart_id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "carts_dvds_dvds" ADD CONSTRAINT "FK_04991af98396ab0bbb8ccbc7d62" FOREIGN KEY ("dvdsDvdId") REFERENCES "dvds"("dvd_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `
        INSERT INTO "users" ("name", "email", "password", "is_admin")
        VALUES ('${process.env.ADMIN_NAME}','${
        process.env.ADMIN_EMAIL
      }', '${hashSync(process.env.ADMIN_PWD, 10)}', true)
      `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "carts_dvds_dvds" DROP CONSTRAINT "FK_04991af98396ab0bbb8ccbc7d62"`
    );
    await queryRunner.query(
      `ALTER TABLE "carts_dvds_dvds" DROP CONSTRAINT "FK_e7b1a7565ae88a31828e5027b6e"`
    );
    await queryRunner.query(
      `ALTER TABLE "orders_dvds_dvds" DROP CONSTRAINT "FK_a2c060b5af9e9db8306a705e0c2"`
    );
    await queryRunner.query(
      `ALTER TABLE "orders_dvds_dvds" DROP CONSTRAINT "FK_704d97cc8ad00bbc40d5e6986b7"`
    );
    await queryRunner.query(
      `ALTER TABLE "carts" DROP CONSTRAINT "FK_b50e2403bed7d7f56a098ef7df4"`
    );
    await queryRunner.query(
      `ALTER TABLE "dvds" DROP CONSTRAINT "FK_0fe076da0979beec634af357ce9"`
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_6a4ebad71685a4ed11e89b3e834"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_04991af98396ab0bbb8ccbc7d6"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e7b1a7565ae88a31828e5027b6"`
    );
    await queryRunner.query(`DROP TABLE "carts_dvds_dvds"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a2c060b5af9e9db8306a705e0c"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_704d97cc8ad00bbc40d5e6986b"`
    );
    await queryRunner.query(`DROP TABLE "orders_dvds_dvds"`);
    await queryRunner.query(`DROP TABLE "carts"`);
    await queryRunner.query(`DROP TABLE "dvds"`);
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "dvd_stocks"`);
  }
}
