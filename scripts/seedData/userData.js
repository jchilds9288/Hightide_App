const { Types: { ObjectId } } = require('mongoose');


module.exports = [
  {
    email: 'ches@gmail.com',
    password: 'pw',
    _id: new ObjectId('5d4497175b7a5c2b0e396349'),
    role: 'admin',
    createdTasks: [
      {
        title: 'myTask1',
        points: 3,
        pool: 'Study',
        createdBy: new ObjectId('5d4497175b7a5c2b0e396349'),
      },
      {
        title: 'myTask2',
        points: 5,
        pool: 'Study',
        createdBy: new ObjectId('5d4497175b7a5c2b0e396349'),
      },
      {
        title: 'myTask3',
        points: 1,
        pool: 'Study',
        createdBy: new ObjectId('5d4497175b7a5c2b0e396349'),
      },
    ],
  },
  {
    email: 'whit@gmail.com',
    password: 'pw',
    _id: new ObjectId('5d4497175b7a5c2b0e396350'),
    role: 'student',
    createdTasks: [],
  },
  {
    email: 'sloane@gmail.com',
    password: 'pw',
    _id: new ObjectId('5d4497175b7a5c2b0e396351'),
    role: 'student',
    createdTasks: [],
  },
  {
    email: 'julia@gmail.com',
    password: 'pw',
    _id: new ObjectId('5d4497175b7a5c2b0e396352'),
    role: 'student',
    createdTasks: [],
  },
];
