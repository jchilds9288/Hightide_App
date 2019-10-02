const mongoose = require('mongoose');
const JWT = require('jsonwebtoken');
const uuid = require('uuid');
const { User } = require('../db/models');


const basicAuth = async (req, res, next) => {
  // make authenticate path public

  if (req.path === '/api/user/login') {
    console.log('thank u next')
    return next();
  }

  // check for basic auth header
  if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
    return res.status(401).json({ message: 'Missing Authorization Header' });
  }

  // verify auth credentials
  const base64Credentials = req.headers.authorization.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [ username, password] = credentials.split(':');
  const User = new mongoose.model("user", userSchema);
  const myUser = await User.findOne({ email });
  console.log(`found ${JSON.stringify(myUser)}`);
  myUser.comparePassword(password, (err, match) => {
    console.log(`returned ${err} and ${match}`)
  })
  // const user = await User.authenticate({ username, password });
  // if (!user) {
  //     return res.status(401).json({ message: 'Invalid Authentication Credentials' });
  // }

  // attach user to request object
  req.user = user

  next();
};

const generateAccessToken = (user, sessionID) => {
  const newProfile = {
    _id: user._id,
    email: user.email,
    password: user.password,
    sessionID,
  };
  return JWT.sign(newProfile, '123456', { expiresIn: 86400 });
};

const generateToken = async (user) => {
  const sessionID = uuid();
  const accessToken = generateAccessToken(user, sessionID);

  return {
    accessToken,
    tokenType: 'Bearer',
  };
};

module.exports = {
  basicAuth,
  generateToken,
};
