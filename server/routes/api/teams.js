const router = require('express').Router();
const mongoose = require('mongoose');
const db = require('../../../server/db/models');

const Team = mongoose.model('Team', db.Team);
const Round = mongoose.model('Round', db.Round);

router.get('/', (req, res, next) => {
  console.log('finding a team')
  Team.find({})
    .then(teams => res.status(200).send(teams))
    .then(null, next);
});

router.post('/', (req, res, next) => {
  console.log('got a team')
  console.log(JSON.stringify(req.body))
  const { body } = req;
  const team = {
    name: body.teamName,
    members: body.teamMembers,
  }
  Team.create(team)
    .then((team) => {
      console.log(`team: ${JSON.stringify(team)}`)
      const roundData = {
        team: team._id,
        dailyGoal: body.dailyGoal,
        roundGoal: body.roundGoal,
      };
      Round.create(roundData)
        .then((round) => {
          console.log(`round: ${JSON.stringify(round)}`);
          const data = {
            name: team.name,
            dailyGoal: round.dailyGoal,
            roundGoal: round.dailyGoal,
          }
          res.status(200).send(data);
        });
    })
    .then(null, next);
});
module.exports = router;
