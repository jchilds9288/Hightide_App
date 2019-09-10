const mongoose = require('mongoose');
const { User } = require('../../db/models');


exports.login = (req, res, next) => {
  console.log(`searching for ${JSON.stringify(req.body)}`)
  return mongoose.model('User', User)
    .find(req.body)
    .then((user) => {
      console.log(`i found: ${JSON.stringify(user)}`)
      return res.status(201).json(user)
    })
    .then(null, next)
    .catch((err) => {
      return console.log(err);
    });
};
