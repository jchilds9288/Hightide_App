const mongoose = require('mongoose');
const { User } = require('../../db/models');
const auth = require('../../auth');

exports.login = async (req, res, next) => {
  console.log(`searching for ${JSON.stringify(req.body)}`)
  try {
    const user = await User.findOne(req.body);
    console.log(`i found: ${JSON.stringify(user)}`);
    const returnedUser = await auth.basicAuth.generateToken(user);
    console.log(`returned: ${JSON.stringify(returnedUser)}`);
    return res.status(201).json(returnedUser);
  } catch (e) {
    console.log('i had an issue finding a user.. ', e);
    next(e);
  }
};
