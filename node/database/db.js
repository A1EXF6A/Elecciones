import { Sequelize } from "sequelize";

const db = new Sequelize('App', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3308,
});

export default db;