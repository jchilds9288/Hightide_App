const router = require('express').Router();
const mongoose = require('mongoose');
const { Types: { ObjectId } } = require('mongoose');

const db = require('../../../server/db/models');

const {
  teamSchema,
  roundSchema,
  roundStatusSchema,
} = require('../../../server/db/models/teamTest');

const newTeam = mongoose.model('TeamTest', teamSchema);
//const newRound = mongoose.model('Round', teamSchema);
//const newRoundStatus = mongoose.model('TeamTest', teamSchema);

const Team = mongoose.model('Team', db.Team);
const Round = mongoose.model('Round', db.Round);
router.get('/', (req, res, next) => {
  console.log('finding a team')
  newTeam.find({})
    .then(teams => res.status(200).send(teams))
    .then(null, next);
});


router.post('/test', (req, res, next) => {
  console.log('got a team')
  console.log(JSON.stringify(req.body))
  const { body } = req;
  const team = {
    name: body.teamName,
    admins: [],
    rounds: [
      {
        goal: body.roundGoal,
        dailyMax: body.dailyGoal,
        roundStatus: [
          {
            userID: new ObjectId('5d4497175b7a5c2b0e396349'),
            partnerID: new ObjectId('5d6d6f384c7988493a9494c3'),
          },
        ],
      },
    ],
  };

  newTeam.create(team)
    .then((createdTeam) => {
      console.log(`createdTeam: ${JSON.stringify(createdTeam)}`)
      res.status(200).send(createdTeam);
    })
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
