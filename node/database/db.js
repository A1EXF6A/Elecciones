import { Sequelize } from "sequelize";

const db = new Sequelize('App', 'postgres', 'admin', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
});

export default db;