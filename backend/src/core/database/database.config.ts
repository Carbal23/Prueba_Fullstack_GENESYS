import * as dotenv from 'dotenv';
import { IDatabaseConfig } from './interfaces/dbConfig.interface';
import { Dialect } from "sequelize";

dotenv.config();

const numberPort = Number(process.env.DB_PORT);
const validDialects: Dialect[] = ['mysql', 'postgres', 'sqlite'];
const dbDialect = process.env.DB_DIALECT as Dialect;

if (!validDialects.includes(dbDialect)) {
  throw new Error(`Invalid DB_DIALECT: ${dbDialect}`);
}

export const databaseConfig: IDatabaseConfig = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: numberPort,
  dialect: dbDialect,
};
