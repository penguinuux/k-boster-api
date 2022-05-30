import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import path from "path";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  logging: false,
  ssl: { rejectUnauthorized: false },
  entities: [path.join(__dirname, "./entities/**/*.{ts,js}")],
  migrations: [path.join(__dirname, "./migrations/**/*.{ts,js}")],
});
