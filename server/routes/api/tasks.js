// const router = require('express').Router();
// const mongoose = require('mongoose');
// const db = require('../../../server/db/models');
//
// const Task = mongoose.model('Task', db.Task);
// // Matches with "/api/tasks"
// router.route("/")
//   .get(taskController.findAll)
//   .post(taskController.create);
// //
//
// // Matches with "/api/tasks/:id"
// router.route("/:id")
//   .get(taskController.findById)
//   .put(taskController.update)
//   .delete(taskController.remove);
//
// module.exports = router;
//
//
//
//
//
// router.get('/', (req, res, next) => {
//   console.log('finding a team')
//   Team.find({})
//     .then(teams => res.status(200).send(teams))
//     .then(null, next);
// });
