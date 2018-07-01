
const Sequelize = require('sequelize');

const config = require('../config');

const options = {
  host: config.database_host,
  dialect: config.database_type,
  operatorsAliases: false,
};

module.exports = new Sequelize(config.database_name,
  config.database_username, config.database_password, options);
