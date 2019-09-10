const { Types: { ObjectId } } = require('mongoose');

const teamTaskData = require('./teamTaskData');
const roundsData = require('./roundData');

module.exports = [
  {
    name: 'Rebel Squadron',
    admins: [new ObjectId('5d4497175b7a5c2b0e396349')],
    tasks: teamTaskData,
    rounds: roundsData,
  },
];
