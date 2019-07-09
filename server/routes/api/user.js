const router = require("express").Router();
// const controller = require("../../controller/controller");
var { generateToken, sendToken } = require('../../../utils/token.utils');
var passport = require('passport');
const mongoose = require('mongoose')
const {User} = require('../../db/models')
require('../../../passport')();

// router.route("/user")
//   .post(controller.createUser);

// Matches with "/api/transactions/auth
router.route('/auth/google')
    .post(passport.authenticate('google-token', {session: false}), function(req, res, next) {
        if (!req.user) {
            return res.send(401, 'User Not Authenticated');
        }
        req.auth = {
            id: req.user.id
        };

        next();
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

module.exports = router;
