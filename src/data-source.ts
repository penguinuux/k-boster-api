import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import path from "path";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PWD,
  database: process.env.POSTGRES_DB,
  logging: false,
  entities: [path.join(__dirname, "./entities/**/*.{js, ts}")],
  migrations: [path.join(__dirname, "./migrations/**/*.{js, ts}")],
});
