const fs = require('fs');
const path = require('path');

const logger = require('../libs/winston');

const env = process.env.NODE_ENV || 'dev';

const CONFIG_ENV_NAME = {
  port: 'APP_PORT',
  debug: 'APP_DEBUG',
  database_host: 'DB_HOST',
  database_database: 'DB_NAME',
  database_type: 'DB_TYPE',
  database_username: 'DB_USERNAME',
  database_password: 'DB_PASSWORD',
};

const CONFIG_FILTER = {
  port: config => parseInt(config, 10),
  debug: config => config.toLowerCase() === 'true',
};

const CONFIG_DEFAULT_VALUE = {
  dev: {
    port: 8080,
    debug: 'true',
    database_host: 'localhost',
    database_database: 'db',
    database_type: 'mysql',
    database_username: 'user',
    database_password: '',
  },
};

const MYCONFIG_FILENAME = 'myconfig.json';
const MYCONFIG_PATH = path.join(__dirname, MYCONFIG_FILENAME);

if (fs.existsSync(MYCONFIG_PATH)) {
  const configContent = fs.readFileSync(MYCONFIG_PATH);
  try {
    CONFIG_DEFAULT_VALUE[env] = JSON.parse(configContent);
  } catch (e) {
    logger.error(e.toString());
  }
}


module.exports = { CONFIG_ENV_NAME, CONFIG_DEFAULT_VALUE, CONFIG_FILTER };
