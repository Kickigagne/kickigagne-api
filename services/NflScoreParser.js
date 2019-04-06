const xmlParser = require('xml2js').parseString;


const logger = require('../libs/winston');

class NflScoreParser {
  static parseScoreArray(scoresArray) {
    const parsedScoresArray = [];
    for (let i = 0; i < scoresArray.length; i += 1) {
      if (scoresArray[i].$) {
        parsedScoresArray[i] = scoresArray[i].$;
      }
    }

    return parsedScoresArray;
  }

  static parseWeekData(xmlWeekData) {
    return new Promise((resolve, reject) => {
      xmlParser(xmlWeekData, (err, jsonWeekData) => {
        if (err) {
          logger.error(err);
          return reject(err);
        }

        if (!jsonWeekData.ss.gms || !jsonWeekData.ss.gms[0]) {
          return resolve({});
        }

        try {
          const parsedData = {};
          const scoresArray = jsonWeekData.ss.gms[0].g;
          parsedData.currentWeek = jsonWeekData.ss.gms[0].$.w;
          parsedData.currentSeason = jsonWeekData.ss.gms[0].$.y;
          parsedData.games = NflScoreParser.parseScoreArray(scoresArray);

          return resolve(parsedData);
        } catch (error) {
          return reject(error);
        }
      });
    });
  }
}

module.exports = NflScoreParser;
