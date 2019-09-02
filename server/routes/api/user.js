// const controller = require("../../controller/controller");
const { generateToken, sendToken } = require('../../../utils/token.utils');
const passport = require('passport');
const { User } = require('../../db/models')
require('../../../passport')();

const router = require('express').Router();
const mongoose = require('mongoose');
const db = require('../../../server/db/models');
const { Types: { ObjectId }} = require('mongoose');

const Task = mongoose.model('Task', db.Task);

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

router.post('/login', (req, res, next) =>  {
  console.log(`searching for ${JSON.stringify(req.body)}`)
  return mongoose.model('User', User)
    .find(req.body)
    .then((user) => {
      console.log(`i found: ${JSON.stringify(user)}`)
      return res.status(201).json(user)
    })
    .then(null, next)
    .catch(err => {
      return console.log(err)
    })
})


router.get('/', (req, res, next) =>  {
  console.log(`searching for ${JSON.stringify(req.body)}`);
  console.log(`searching for ${JSON.stringify(req.query)}`);
  console.log(`searching for ${JSON.stringify(Object.keys(req))}`);

  return mongoose.model('User', User)
    .find(req.query)
    .then((user) => {
      console.log(`i found these users: ${JSON.stringify(user)}`)
      return res.status(200).json(user)
    })
    .then(null, next)
    .catch(err => {
      return console.log(err)
    })
})

router.get('/:id/tasks', (req, res, next) =>  {
  console.log(`searching for ${JSON.stringify(req.params.id)}`);

  return Task
    .find({ user: new ObjectId(req.params.id) })
    .then((tasks) => {
      console.log(`i found these tasks: ${JSON.stringify(tasks)}`)
      return res.status(200).json(tasks);
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
