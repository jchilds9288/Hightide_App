const mongoose = require('mongoose');
const { Types: { ObjectId } } = require('mongoose');

const { Schema } = mongoose;

const Task = new Schema({
  created: {
    type: Date,
    default: Date.now,
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
    default: 3,
  },
});

const roundStatusSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  partnerID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  points: {
    type: Number,
    required: true,
    default: 0,
  },
  tasks: {
    type: [Task],
    required: true,
    default: [],
  },
});

const roundSchema = new Schema({
  started: {
    type: Date,
    default: Date.now,
  },
  goal: {
    type: Number,
    default: 300,
  },
  dailyMax: {
    type: Number,
    default: 25,
  },
  roundStatus: {
    type: [roundStatusSchema],
    required: true,
    default: [],
  },
});

const teamTask = new Schema({
  title: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  points: {
    type: Number,
    required: true,
  },
  proofRequired: {
    type: Boolean,
    required: false,
  },
  pool: {
    type: String,
    default: 'Happy',
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { autoIndex: false });

const teamSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
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
  rounds: {
    type: [roundSchema],
    required: true,
    default: [],
  },
  tasks: {
    type: [teamTask],
    required: true,
    default: [],
  },
}, { autoIndex: false });

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
module.exports = {
  teamSchema,
  roundSchema,
  roundStatusSchema,
  teamTask,
};
