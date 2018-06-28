const CONFIG_DATA = require('./config');

const env = process.env.NODE_ENV || 'dev';

const defaultConfig = CONFIG_DATA.CONFIG_DEFAULT_VALUE[env] || [];
const config = {};

Object.keys(CONFIG_DATA.CONFIG_ENV_NAME).forEach((key) => {
  const rawValue = process.env[CONFIG_DATA.CONFIG_ENV_NAME[key]] || defaultConfig[key];

  config[key] = CONFIG_DATA.CONFIG_FILTER[key]
    ? CONFIG_DATA.CONFIG_FILTER[key](rawValue)
    : rawValue;
});

module.exports = config;
