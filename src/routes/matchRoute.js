const express = require('express');
const matchController = require('../controllers/matchController');


module.exports.init = (scoreGrabber) => {
  const router = express.Router();

  router.get('/current/metadata', matchController.getCurrentWeekMetadata(scoreGrabber));
  router.get('/all/data', matchController.getAllWeekData(scoreGrabber));

  return router;
};
