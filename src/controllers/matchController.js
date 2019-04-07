module.exports.getCurrentWeekMetadata = scoreGrabber => (req, res) => res.json({
  currentWeek: scoreGrabber.currentWeek,
  currentSeason: scoreGrabber.currentSeason,
});

module.exports.getAllWeekData = scoreGrabber => (req, res) => res.json({
  scoresByWeek: scoreGrabber.scoresByWeek,
});
