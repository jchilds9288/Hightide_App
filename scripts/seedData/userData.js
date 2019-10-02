const { Types: { ObjectId } } = require('mongoose');


module.exports = [
  {
    email: 'ches@gmail.com',
    password: 'pw',
    _id: new ObjectId('5d4497175b7a5c2b0e396349'),
    role: 'admin',
    createdTasks: [
      {
        title: 'myHealthTask1',
        points: 3,
        pool: 'Health',
        createdBy: new ObjectId('5d4497175b7a5c2b0e396349'),
      },
      {
        title: 'myEmotionTask2',
        points: 5,
        pool: 'Emotion',
        createdBy: new ObjectId('5d4497175b7a5c2b0e396349'),
      },
      {
        title: 'mySocialTask3',
        points: 1,
        pool: 'Social',
        createdBy: new ObjectId('5d4497175b7a5c2b0e396349'),
      },
    ],
  },
  {
    email: 'whit@gmail.com',
    password: 'pw',
    _id: new ObjectId('5d4497175b7a5c2b0e396350'),
    role: 'student',
    createdTasks: [
      {
        title: 'WhitHapTask1',
        points: 3,
        pool: 'Happy',
        createdBy: new ObjectId('5d4497175b7a5c2b0e396349'),
      },
      {
        title: 'WhitEmotionTask2',
        points: 5,
        pool: 'Emotion',
        createdBy: new ObjectId('5d4497175b7a5c2b0e396349'),
      },
      {
        title: 'myWhitHealthyTask3',
        points: 1,
        pool: 'Health',
        createdBy: new ObjectId('5d4497175b7a5c2b0e396349'),
      },
    ],
  },
  {
    email: 'sloane@gmail.com',
    password: 'pw',
    _id: new ObjectId('5d4497175b7a5c2b0e396351'),
    role: 'student',
    createdTasks: [
      {
        title: 'sloaneTask1',
        points: 3,
        pool: 'Emotion',
        createdBy: new ObjectId('5d4497175b7a5c2b0e396349'),
      },
      {
        title: 'sloaneTask2',
        points: 5,
        pool: 'Happy',
        createdBy: new ObjectId('5d4497175b7a5c2b0e396349'),
      },
      {
        title: 'sloaneTask3',
        points: 1,
        pool: 'Social',
        createdBy: new ObjectId('5d4497175b7a5c2b0e396349'),
      },
    ],
  },
  {
    email: 'julia@gmail.com',
    password: 'pw',
    _id: new ObjectId('5d4497175b7a5c2b0e396352'),
    role: 'student',
    createdTasks: [
      {
        title: 'julesHealthTask1',
        points: 3,
        pool: 'Health',
        createdBy: new ObjectId('5d4497175b7a5c2b0e396349'),
      },
      {
        title: 'julesTask2',
        points: 5,
        pool: 'Emotion',
        createdBy: new ObjectId('5d4497175b7a5c2b0e396349'),
      },
      {
        title: 'julesHapTask3',
        points: 1,
        pool: 'Happy',
        createdBy: new ObjectId('5d4497175b7a5c2b0e396349'),
      },
    ],
  },
];
