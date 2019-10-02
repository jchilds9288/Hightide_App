// const controller = require("../../controller/controller");
const passport = require('passport');
const router = require('express').Router();
const mongoose = require('mongoose');
const { Types: { ObjectId } } = require('mongoose');

require('../../../passport')();

const { generateToken, sendToken } = require('../../../utils/token.utils');
const { User } = require('../../db/models');
const db = require('../../../server/db/models');
const routeWrapper = require('../../utils/routeWrapper');
// const Task = mongoose.model('Task', db.Task);
const { RoundStatus } = db;


router.post('/', routeWrapper(async (req, res) => {
  console.log(`creating from ${JSON.stringify(req.body)}`);
  const user = User.create(req.body);
  console.log('created')
  return res.status(201).json(user);
}));


router.get('/', routeWrapper(async (req, res) => {
  req.query = { _id: new ObjectId('5d4497175b7a5c2b0e396349') };
  console.log(`trying to grab ${JSON.stringify(req.query)}`);

  const user = await User.find(req.query);
  console.log(`i found these users: ${JSON.stringify(user)}`);
  return res.status(200).json(user);
}));

router.get('/:id/tasks/round', routeWrapper(async (req, res) => {
//  console.log(`searching for ${JSON.stringify(req.params.id)}`);
  const result = await RoundStatus
    .findOne({
      roundID: new ObjectId('5d4497175b7a5c2b0e396381'),
      userID: new ObjectId('5d4497175b7a5c2b0e396349'),
    })
    .select('tasks');

  console.log(`am i a thing: ${JSON.stringify(result.tasks[0])}`)
  const { tasks } = result;
  return res.status(200).json(tasks);
}));

//Model.findOneAndUpdate({ name : 'myBook', "data._id" : 'chapter' }, { "data.$.name" : 'Chapter 1' });

router.post('/:id/tasks/round', routeWrapper(async (req, res) => {
//  console.log(`searching for ${JSON.stringify(req.params.id)}`);
  console.log(`bod: ${JSON.stringify(req.body)}`)
  let taskDone = false;
  const { completed, title } = req.body;
  console.log(`is ${title} completed: ${completed}`);
  console.log(`!completed: ${!completed}`);
  const result = await RoundStatus.findOneAndUpdate(
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
  );
    // console.log(`hayyy: ${JSON.stringify(result)}`);
  result.tasks.forEach((task) => {
    if (task.title === title) {
      console.log(JSON.stringify(task));
    }
  });
  result.save();
  return res.status(200).json(result);
}));

router.get('/:id/tasks', routeWrapper(async (req, res) => {
  console.log(`searching for ${JSON.stringify(req.params.id)}`);
  const userID =  new ObjectId(req.params.id);
  const user = await User
    .findOne({ _id: userID });

  console.log(`i found this user: ${JSON.stringify(user)}`)
  return res.status(200).json(user);
}))

router.post('/:id/tasks', routeWrapper(async (req, res) =>  {
  console.log(`adding for ${JSON.stringify(req.body)}`);
  const task = await Task
    .create({
      user: new ObjectId(req.params.id),
      title: req.body.title,
      points: req.body.points,
      pool: req.body.pool,
    });

  console.log(`i made: ${JSON.stringify(task)}`);
  return res.status(200).json(task);

}));

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
