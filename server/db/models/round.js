const mongoose = require('mongoose');

const { Schema } = mongoose;

const roundStatusSchema = require('./roundStatus');

const roundSchema = new Schema({
  teamID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TeamTest',
  },
  started: {
    type: Date,
    default: Date.now,
  },
  goal: {
    type: Number,
    default: 300,
  },
  dailyMax: {
    type: Number,
    default: 25,
  },
  roundStatus: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'RoundStatus',
    default: [],
  }],
});

const Round = mongoose.model('Round', roundSchema);

module.exports = Round;
