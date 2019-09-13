const mongoose = require('mongoose');

const { Schema } = mongoose;
const roundTaskSchema = require('./roundTask');


const roundStatusSchema = new Schema({
  roundID: {
    type: Schema.Types.ObjectId,
    ref: 'Round',
    required: true,
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  partnerID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  points: {
    type: Number,
    required: true,
    default: 0,
  },
  tasks: {
    type: [roundTaskSchema],
    required: true,
    default: [],
  },
});

const RoundStatus = mongoose.model('RoundStatus', roundStatusSchema);
module.exports = RoundStatus;
