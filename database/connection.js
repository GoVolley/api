const Sequelize = require("sequelize");

const sequelize = new Sequelize('test', 'root', process.env.MYSQL_PASSWORD, {
  dialect: 'mysql',
  host: process.env.MYSQL_HOST,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  }
});

module.exports = sequelize;