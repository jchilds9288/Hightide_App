const { Types: { ObjectId } } = require('mongoose');

const roundStatuses = require('./roundStatusData');

module.exports = [{
  _id: new ObjectId('5d4497175b7a5c2b0e396381'),
  teamID: new ObjectId('5d4497175b7a5c2b0e396380'),
  goal: 400,
  dailyMax: 25,
  roundStatus: [new ObjectId('5d4497175b7a5c2b0e396382')],
}];
