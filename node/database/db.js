import { Sequelize } from "sequelize";

const db = new Sequelize('App', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 5432,
});

export default db;