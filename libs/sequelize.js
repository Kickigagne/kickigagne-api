const Sequelize = require('sequelize');

const options = {
  host: process.env.DB_HOST,
  dialect: process.env.DB_TYPE,
  operatorsAliases: false,
};

module.exports = new Sequelize(process.env.DB_NAME,
  process.env.DB_USERNAME, process.env.DB_PASSWORD, options);
