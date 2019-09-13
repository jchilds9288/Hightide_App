// const controller = require("../../controller/controller");
const { generateToken, sendToken } = require('../../../utils/token.utils');
const passport = require('passport');
const { User } = require('../../db/models')
require('../../../passport')();

const router = require('express').Router();
const mongoose = require('mongoose');
const db = require('../../../server/db/models');
const { Types: { ObjectId }} = require('mongoose');

//onst Task = mongoose.model('Task', db.Task);
const { TeamTest, Round, RoundStatus } = db;

// router.route("/user")
//   .post(controller.createUser);

// Matches with "/api/transactions/auth
router.route('/auth/google')
  .post(passport.authenticate('google-token', { session: false }), (req, res, next) => {
    if (!req.user) {
      return res.send(401, 'User Not Authenticated');
    }
    req.auth = {
      id: req.user.id,
    };

    return next();
  }, generateToken, sendToken);

router.post('/', (req, res, next) =>  {
  console.log(`creating from ${JSON.stringify(req.body)}`)
  return mongoose.model('User', User)
    .create(req.body)
    .then((user) => {
      console.log('created')
      return res.status(201).json(user)
    })
    .catch(err => {
      console.log('prob')
      return console.log(err)
    })
})


router.get('/', (req, res, next) =>  {
  //console.log(`searching for ${JSON.stringify(req.body)}`);
  //console.log(`searching for ${JSON.stringify(req.query)}`);
  //console.log(`searching for ${JSON.stringify(Object.keys(req))}`);
  req.query = { _id: new ObjectId('5d4497175b7a5c2b0e396349') };
  console.log(`trying to grab ${JSON.stringify(req.query)}`)
  return User
    .find(req.query)
    .then((user) => {
      console.log(`i found these users: ${JSON.stringify(user)}`)
      return res.status(200).json(user)
    })
    .catch(err => {
      console.log(`prob: ${err}`)
      return console.log(err)
    })
})
router.get('/:id/tasks/round', (req, res, next) =>  {
//  console.log(`searching for ${JSON.stringify(req.params.id)}`);

  return RoundStatus.findOne({
    roundID: new ObjectId('5d4497175b7a5c2b0e396381'),
    userID: new ObjectId('5d4497175b7a5c2b0e396349'),
  })
    .select('tasks')
    .then((result) => {
    //  console.log(`holy shit i found a team: ${JSON.stringify(result.rounds[0].roundStatus[0].tasks)}`)
      console.log(`am i a thing: ${JSON.stringify(result.tasks[0])}`)
      const tasks = result.tasks;
      return res.status(200).json(tasks);
    })
    .then(null, next)
    .catch((err) => {
      return console.log(err)
    });
})

//Model.findOneAndUpdate({ name : 'myBook', "data._id" : 'chapter' }, { "data.$.name" : 'Chapter 1' });

router.post('/:id/tasks/round', (req, res, next) =>  {
//  console.log(`searching for ${JSON.stringify(req.params.id)}`);
  console.log(`bod: ${JSON.stringify(req.body)}`)
  let taskDone = false;
  const { completed, title } = req.body;
  console.log(`is ${title} completed: ${completed}`);
  console.log(`!completed: ${!completed}`);
  return RoundStatus.findOneAndUpdate(
    {
      roundID: new ObjectId('5d4497175b7a5c2b0e396381'),
      userID: new ObjectId('5d4497175b7a5c2b0e396349'),
      'tasks.title': title,
    },
    {
      $set: {
        'tasks.$.completed': !completed,
      },
    },
    { new: true },
  ).then((result) => {
    //console.log(`hayyy: ${JSON.stringify(result)}`);
    result.tasks.forEach((task) => {
      if (task.title === title) {
        console.log(JSON.stringify(task))
      }
    })
    result.save();
    return res.status(200).json(result);
  })
    .catch((err) => {
      console.log(`err: ${err}`);
    });
  // return TeamTest.findOne({
  //   _id: new ObjectId('5d4497175b7a5c2b0e396380'),
  // })
  //   .select('rounds')
  //   .then((result) => {
  //   //  console.log(`holy shit i found a team: ${JSON.stringify(result.rounds[0].roundStatus[0].tasks)}`)
  //     console.log(`am i a thing: ${JSON.stringify(result.rounds[0].roundStatus[0].tasks[0])}`)
  //     result.rounds[0].roundStatus[0].tasks[0].completed = false;
  //     console.log(JSON.stringify(result.rounds[0].roundStatus[0]))
  //     result.save();
  //     return res.status(200).json(result);
  //   })
  //   .then(null, next)
  //   .catch((err) => {
  //     return console.log(err)
  //   });
})

router.get('/:id/tasks', (req, res, next) =>  {
  console.log(`searching for ${JSON.stringify(req.params.id)}`);
  const userID =  new ObjectId(req.params.id);
  return User
    .findOne({ _id: userID })
    .then((user) => {
      console.log(`i found this user: ${JSON.stringify(user)}`)
      return res.status(200).json(user);
    })
    .then(null, next)
    .catch((err) => {
      return console.log(err)
    });
})

router.post('/:id/tasks', (req, res, next) =>  {
  console.log(`adding for ${JSON.stringify(req.body)}`);

  return Task
    .create({
      user: new ObjectId(req.params.id),
      title: req.body.title,
      points: req.body.points,
      pool: req.body.pool,
    })
    .then((task) => {
      console.log(`i made: ${JSON.stringify(task)}`)
      return res.status(200).json(task);
    })
    .then(null, next)
    .catch((err) => {
      console.log('THERE WAS A PROB')
      return console.log(err)
    });
})

router.delete('/:id/tasks/:task', (req, res, next) =>  {
  console.log(`deleting for ${JSON.stringify(req.params.task)}`);
  return Task
    .deleteOne({
      _id: new ObjectId(req.params.task)
    })
    .then((task) => {
      console.log(`i deleted: ${JSON.stringify(task)}`)
      return res.status(200).json(task);
    })
    .then(null, next)
    .catch((err) => {
      console.log('THERE WAS A PROB')
      return console.log(err)
    });
})

module.exports = router;
