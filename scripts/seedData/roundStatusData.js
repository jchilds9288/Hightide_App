const { Types: { ObjectId } } = require('mongoose');

module.exports = [{
  userID: new ObjectId('5d4497175b7a5c2b0e396349'),
  partnerID: new ObjectId('5d4497175b7a5c2b0e396350'),
  points: 50,
  tasks: [{
    userID: new ObjectId('5d4497175b7a5c2b0e396349'),
    title: 'i did this',
    points: 5,
  }],
}];
