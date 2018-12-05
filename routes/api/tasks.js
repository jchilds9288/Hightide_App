const router = require("express").Router();
const tasksController = require("../../controllers/taskController");

// Matches with "/api/tasks"
router.route("/profile")
  .get(tasksController.findAll)
//   .post(tasksController.create);

// Matches with "/api/tasks/:id"
// router
//   .route("/:id")
//   .get(tasksController.findById)
//   .put(tasksController.update)
//   .delete(tasksController.remove);

module.exports = router;