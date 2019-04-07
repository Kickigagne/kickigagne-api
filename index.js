require('dotenv').config();

const app = require('./src/libs/express');
const logger = require('./src/libs/winston');

const ScoreGrabber = require('./src/services/scoreGrabber');

const matchRouter = require('./src/routes/matchRoute');

const scoreGrabber = new ScoreGrabber();

scoreGrabber.fetchCurrentWeekData().then(() => {
  logger.info(`ScoreGrabber started, currently at week ${scoreGrabber.currentWeek} of ${scoreGrabber.currentSeason}`);
  scoreGrabber.fetchAllWeek().then(() => {
    logger.info(`All weeks (${scoreGrabber.scoresByWeek.length}) have been saved`);
    // logger.info('all', scoreGrabber.scoresByWeek);

    app.use('/match', matchRouter.init(scoreGrabber));

    app.listen(process.env.APP_PORT || 8080, () => {
      logger.info(`Listening on port ${process.env.APP_PORT || 8080}`);
    });
  });
});
