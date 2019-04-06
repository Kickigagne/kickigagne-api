const request = require('request-promise');

const NflScoreParser = require('./NflScoreParser');

const logger = require('../libs/winston');

/**
 * seasonType can be PRE, REG, or POST.
 * For reg or post, weeks go 1-22 (18 is WC, 19 Div, 20 Conf Championship, 21 is blank, 22 is SB).
 * Source : https://www.reddit.com/r/NFLstatheads/comments/59drb1/how_to_query_nfls_liveupdate_json_data/
 */
const QUERY_NFL_URL = 'http://www.nfl.com/ajax/scorestrip?season=#season#&seasonType=#type#&week=#week#';
const CURRENT_WEEK_NFL_URL = 'http://www.nfl.com/liveupdate/scorestrip/ss.xml';

class ScoreGrabber {
  constructor(options) {
    this.options = options;
    this.scoresByWeek = [];
    this.currentWeek = 0;
    this.currentSeason = 2000;
  }

  fetchCurrentWeekData() {
    return new Promise((resolve, reject) => {
      request(CURRENT_WEEK_NFL_URL)
        .then((xmlResponse) => {
          NflScoreParser.parseWeekData(xmlResponse).then((parsedWeekData) => {
            this.currentWeek = parsedWeekData.currentWeek;
            this.currentSeason = parsedWeekData.currentSeason;
            resolve(parsedWeekData.games);
          }).catch(reject);
        })
        .catch((err) => {
          logger.error(err);
          reject(err);
        });
    });
  }

  fetchAllWeek() {
    const allWeeksPromArray = [];
    let specifcWeekWeekQueryUrl = QUERY_NFL_URL.replace('#season#', this.currentSeason);
    specifcWeekWeekQueryUrl = specifcWeekWeekQueryUrl.replace('#type#', 'REG');

    for (let i = 1; i <= 22; i += 1) {
      if (i !== 21) {
        allWeeksPromArray.push(new Promise((resolve, reject) => {
          request(specifcWeekWeekQueryUrl.replace('#week#', i))
            .then((xmlResponse) => {
              NflScoreParser.parseWeekData(xmlResponse).then((parsedWeekData) => {
                if (parsedWeekData.games) {
                  this.scoresByWeek.push(parsedWeekData.games);
                }
                resolve(parsedWeekData.games);
              }).catch(reject);
            })
            .catch((err) => {
              logger.error(err);
              reject(err);
            });
        }));
      }
    }
    return Promise.all(allWeeksPromArray);
  }
}

module.exports = ScoreGrabber;
