const mongoose = require('mongoose');
const db = require('../server/db/models');

mongoose.connect(
  process.env.MONGODB_URI
  || 'mongodb://localhost/hightidedb',
  { autoIndex: false },
);

const taskSeed = [
  {
    title: 'Do Push Ups, Sit Ups, and Pull Ups',
    points: 3,
    proofRequired: false,
  },
  {
    title: 'Reach out to a Friend',
    points: 5,
    proofRequired: false,
  },
  {
    title: 'Go out to lunch with a biz Contact',
    points: 3,
    proofRequired: false,
  },
  {
    title: 'Play Fetch with hatch',
    points: 1,
    proofRequired: false,
  },
  {
    title: 'Eat a Vegetable',
    points: 1,
    proofRequired: false,
  },
  {
    title: 'Cook Dinner',
    points: 5,
    proofRequired: false,
  },
  {
    title: 'Go see a Movie',
    points: 1,
    proofRequired: false,
  },
];

const userSeed = [
  {
    email: 'ches@gmail.com',
    password: 'pw',
  },
];


const Task = mongoose.model('Task', db.Task);
const User = mongoose.model('User', db.User);
const Pool = mongoose.model('Pool', db.Pool);

Promise.all([
  Task.remove({}),
  User.remove({}),
  Pool.remove({}),
]).then(() => {
  Promise.all([
    User.collection.insertMany(userSeed),
  ]).then(([users]) => {
    taskSeed.forEach((task) => {
      task.user = users.ops[0];
    });
    console.log(`i did tasks: ${JSON.stringify(taskSeed)}`)

    Task.collection.insertMany(taskSeed)
      .then((data) => {
        console.log(data.result.n + ' records inserted!');
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

// Task.remove({})
//     .then(() => Task.collection.insertMany(taskSeed))
//     .then(data => {
//         console.log(data.result.n + " records inserted!");
//
//         User.remove({})
//             .then(() => User.collection.insertMany(userSeed))
//             .then(data => {
//                 console.log(data.result.n + " records inserted!");
//                 process.exit(0);
//             })
//             .catch(err => {
//                 console.log(err);
//                 process.exit(1);
//             });
//     })
//     .catch(err => {
//         console.log(err);
//         process.exit(1);
//     });
