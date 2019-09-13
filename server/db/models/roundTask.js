const mongoose = require('mongoose');

const { Schema } = mongoose;


const roundTaskSchema = new Schema({
  _id: {
    type: Schema.ObjectId,
    auto: true,
  },
  created: {
    type: Date,
    required: true,
    default: new Date(),
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  points: {
    type: Number,
    required: true,
    default: 3,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
});

roundTaskSchema.index({ title: 1 }, { unique: true });

module.exports = roundTaskSchema;
