/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console  */
/* eslint-disable no-param-reassign  */

const mongoose = require('mongoose');
const db = require('../server/db/models');
let {
  userData,
  taskData,
  teamData,
  roundData,
  accountData,
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
const Account = mongoose.model('Account', db.Account);

const addVal = (arrOfObj, key, val) => {
  arrOfObj = arrOfObj.map((obj) => {
    const row = obj;
    row[key] = val;
    console.log(`adding ${key} with ${val}`);
    console.log(JSON.stringify(row));
    return row;
  });
  console.log(JSON.stringify(arrOfObj));
  return arrOfObj;
};

const seed = async () => {

  try {
    await Promise.all([Task.remove({}), User.remove({}), Pool.remove({}),
      Team.remove({}), Round.remove({}), Account.remove({}),
    ]);

    const acct = await Account.insertMany(accountData);
    console.log(`${acct.length} acct tasks records inserted!`);
    console.log(acct);
    userData = addVal(userData, 'account', acct[0]._id);
    console.log('userData: ', JSON.stringify(userData));
    const users = await User.collection.insertMany(userData);
    console.log('users: ', JSON.stringify(users));
    console.log(`${users.result.n} users tasks records inserted!`);

    teamData[0].members = users.ops;
    console.log(JSON.stringify(teamData));

    taskData.forEach((task, i) => {
      taskData[i].user = users.ops[0]._id;
    });

    const tasks = await Task.collection.insertMany(taskData);
    console.log(`${tasks.result.n} tasks records inserted!`);

    const teams = await Team.collection.insertMany(teamData);
    console.log(`${teams.result.n} teams records inserted!`);

    roundData.forEach((round) => {
      round.team = [teams.ops];
    });

    const rounds = await Round.collection.insertMany(roundData);
    console.log(`${rounds.result.n} rounds records inserted!`);
  }

  catch (e) {
    console.log(`there was a prob!: ${e}`);
  }
};
// Promise.all([
//   Task.remove({}),
//   User.remove({}),
//   Pool.remove({}),
//   Team.remove({}),
//   Round.remove({}),
//   Account.remove({}),
// ]).then(() => {
//   Promise.all([
//     User.collection.insertMany(userData),
//   ]).then(([users]) => {
//     console.log(`users first: ${JSON.stringify(users)}`);
//     teamData[0].members = users.ops;
//     console.log(JSON.stringify(teamData));
//
//     taskData.forEach((task, i) => {
//     //  console.log(`users: ${JSON.stringify([users.ops])}`)
//       taskData[i].user = users.ops[0]._id;
//     });
//     Task.collection.insertMany(taskData)
//       .then((data) => {
//         console.log(`${data.result.n} records inserted!`);
//         Team.collection.insertMany(teamData)
//           .then((team) => {
//             console.log(`${team.result.n} records inserted!`);
//             //  console.log(JSON.stringify(team))
//             roundData.forEach((round) => {
//               round.team = [team.ops];
//             });
//             Round.collection.insertMany(roundData)
//               .then((round) => {
//                 console.log(`${round.result.n} records inserted!`);
//               });
//           })
//           .catch((err) => {
//             console.log(err);
//             process.exit(1);
//           });
//       })
//       .catch((err) => {
//         console.log(err);
//         process.exit(1);
//       });
//   });
// })
//   .catch((err) => {
//     console.log(err);
//     process.exit(1);
//   });

seed();
