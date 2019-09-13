/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console  */
/* eslint-disable no-param-reassign  */

const mongoose = require('mongoose');
const db = require('../server/db/models');
const {
  userData,
  teamData,
  roundData,
  roundStatusData,
} = require('./seedData');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/hightidedb');


const {
  User,
  TeamTest: Team,
  Round,
  RoundStatus,
} = db;

const seed = async () => {
  try {
    await Promise.all([
      User.remove({}),
      Team.remove({}),
      Round.remove({}),
      RoundStatus.remove({}),
    ]);

    const users = await User.collection.insertMany(userData);
    console.log('users: ', JSON.stringify(users));
    console.log(`${users.result.n} users tasks records inserted!`);

    const rounds = await Round.collection.insertMany(roundData);
    console.log(`${rounds.result.n} rounds records inserted!`);

    const roundStatus = await RoundStatus.collection.insertMany(roundStatusData);
    console.log(`${roundStatus.result.n} rounds records inserted!`);

    const teams = await Team.collection.insertMany(teamData);
    console.log(`${teams.result.n} teams records inserted!`);
  } catch (e) {
    console.log(`there was a prob!: ${e}`);
  }
};


seed();
