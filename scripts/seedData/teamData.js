const { Types: { ObjectId } } = require('mongoose');

const teamTaskData = require('./teamTaskData');
//const roundsData = require('./roundData');

module.exports = [
  {
    _id: new ObjectId('5d4497175b7a5c2b0e396380'),
    name: 'Rebel Squadron',
    players: [
      new ObjectId('5d4497175b7a5c2b0e396349'),
      new ObjectId('5d4497175b7a5c2b0e396350'),
      new ObjectId('5d4497175b7a5c2b0e396351'),
      new ObjectId('5d4497175b7a5c2b0e396352')
    ],
    admins: [new ObjectId('5d4497175b7a5c2b0e396349')],
    tasks: teamTaskData,
    rounds: [new ObjectId('5d4497175b7a5c2b0e396381')],
  },
];
