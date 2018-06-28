
const app = require('./libs/express');
const logger = require('./libs/winston');

const config = require('./config');

app.listen(config.port, () => {
  logger.info(`Listening on port ${config.port}`);
});
