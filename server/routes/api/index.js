const router = require('express').Router();
const taskRoutes = require('./tasks');
const userRoutes = require('./user');
const teamRoutes = require('./teams');

// Task routes
//router.use('/tasks', taskRoutes);
router.use('/user', userRoutes);
router.use('/team', teamRoutes);

module.exports = router;
