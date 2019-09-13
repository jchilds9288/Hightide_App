const mongoose = require('mongoose');
const { Types: { ObjectId } } = require('mongoose');

const TeamTest = require('./teamTest');
//mongoose.model('Team', teamSchema);
//module.exports = teamSchema;

const myRoundStatus = {
  userID: new ObjectId('5d4497175b7a5c2b0e396349'),
  partnerID: new ObjectId('5d6d6f384c7988493a9494c3'),
};

const myRound = {
  goal: 400,
  dailyMax: 50,
  roundStatus: [myRoundStatus],
};

const myTeam = {
  name: 'myTestTeam!',
  admins: [],
  rounds: [myRound],
};
//
// console.log('asdfasd')
// console.log(TeamTest)
const run = () => {
  console.log('asdf')
  return TeamTest.findOne({
    _id: new ObjectId('5d4497175b7a5c2b0e396380')
  })
    .select('rounds')
    .then((result) => {
      console.log(`holy shit i found a team: ${JSON.stringify(result.rounds[0].roundStatus[0].tasks)}`)
    //  team.save();
    })
    .catch((err) => {
      console.log(`oh fuck: ${err}`)
    });
};

//run();
