import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "postgres",
  "postgres",
  "",
  {
    host: "127.0.0.1",
    port: 5433,
    dialect: "postgres",
    logging: false
  }
);