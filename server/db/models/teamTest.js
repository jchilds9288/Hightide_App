const mongoose = require('mongoose');
const { Types: { ObjectId } } = require('mongoose');

const { Schema } = mongoose;

const teamTaskSchema = require('./teamTask');
//const roundSchema = require('./round');

const teamSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  players: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    default: [],
  }],
  admins: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    default: [],
  }],
  created: {
    type: Date,
    default: Date.now,
  },
  rounds: [{
    type: Schema.Types.ObjectId,
    ref: 'Round',
    required: true,
    default: [],
  }],
  tasks: {
    type: [teamTaskSchema],
    required: true,
    default: [],
  },
});

//mongoose.model('Team', teamSchema);
//module.exports = teamSchema;

//const TeamTest = mongoose.model('TeamTest', teamSchema);

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
  return TeamTest.create(myTeam)
    .then((team) => {
      console.log(`holy shit i worked: ${JSON.stringify(team)}`)
      team.save();
    })
    .catch((err) => {
      console.log(`oh fuck: ${err}`)
    });
};

//run();
const TeamTest = mongoose.model('TeamTest', teamSchema);

module.exports = TeamTest;
