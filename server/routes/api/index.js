const router = require('express').Router();
const taskRoutes = require('./tasks');
const userRoutes = require('./user');
const teamRoutes = require('./teams');
const auth = require('./auth');

// Task routes
//router.use('/tasks', taskRoutes);
router.use('/user', userRoutes);
router.use('/team', teamRoutes);
router.use('/login', auth.login);


module.exports = router;
