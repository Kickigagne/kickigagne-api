require('dotenv').config();

const app = require('./libs/express');
const logger = require('./libs/winston');

app.listen(process.env.APP_PORT, () => {
  logger.info(`Listening on port ${process.env.APP_PORT}`);
});
