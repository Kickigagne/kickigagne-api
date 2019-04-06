require('dotenv').config();

const app = require('./libs/express');
const logger = require('./libs/winston');

const ScoreGrabber = require('./services/scoreGrabber');

app.listen(process.env.APP_PORT, () => {
  logger.info(`Listening on port ${process.env.APP_PORT}`);
});

const scoreGrabber = new ScoreGrabber();
scoreGrabber.fetchCurrentWeekData().then(() => {
  logger.info(`ScoreGrabber started, currently at week ${scoreGrabber.currentWeek} of ${scoreGrabber.currentSeason}`);
  scoreGrabber.fetchAllWeek().then(() => {
    logger.info(`All weeks (${scoreGrabber.scoresByWeek.length}) have been saved`);
    logger.info('all', scoreGrabber.scoresByWeek);
  });
});
