/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console  */

const mongoose = require('mongoose');
const db = require('../server/db/models');
const {
  userData,
  taskData,
  teamData,
  roundData,
} = require('./seedData');

mongoose.connect(
  process.env.MONGODB_URI
  || 'mongodb://localhost/hightidedb',
  { autoIndex: false },
);


const Task = mongoose.model('Task', db.Task);
const User = mongoose.model('User', db.User);
const Pool = mongoose.model('Pool', db.Pool);
const Team = mongoose.model('Team', db.Team);
const Round = mongoose.model('Round', db.Round);


Promise.all([
  Task.remove({}),
  User.remove({}),
  Pool.remove({}),
  Team.remove({}),
  Round.remove({}),
]).then(() => {
  Promise.all([
    User.collection.insertMany(userData),
  ]).then(([users]) => {
    console.log(`users first: ${JSON.stringify(users)}`);
    teamData[0].members = users.ops;
    console.log(JSON.stringify(teamData));

    taskData.forEach((task, i) => {
    //  console.log(`users: ${JSON.stringify([users.ops])}`)
      taskData[i].user = users.ops[0]._id;
    });
    Task.collection.insertMany(taskData)
      .then((data) => {
        console.log(`${data.result.n} records inserted!`);
        Team.collection.insertMany(teamData)
          .then((team) => {
            console.log(`${team.result.n} records inserted!`);
            //  console.log(JSON.stringify(team))
            roundData.forEach((round) => {
              round.team = [team.ops];
            });
            Round.collection.insertMany(roundData)
              .then((round) => {
                console.log(`${round.result.n} records inserted!`);
              });
          })
          .catch((err) => {
            console.log(err);
            process.exit(1);
          });
      })
      .catch((err) => {
        console.log(err);
        process.exit(1);
      });
  });
})
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
