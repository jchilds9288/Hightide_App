const { Types: { ObjectId } } = require('mongoose');
const taskData = require('./taskData');

module.exports = [{
  _id: new ObjectId('5d4497175b7a5c2b0e396382'),
  roundID: new ObjectId('5d4497175b7a5c2b0e396381'),
  userID: new ObjectId('5d4497175b7a5c2b0e396349'),
  partnerID: new ObjectId('5d4497175b7a5c2b0e396350'),
  points: 50,
  tasks: taskData,
}];
