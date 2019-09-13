const mongoose = require('mongoose');

const { Schema } = mongoose;

const teamTaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  points: {
    type: Number,
    required: true,
  },
  proofRequired: {
    type: Boolean,
    required: false,
  },
  pool: {
    type: String,
    default: 'Happy',
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

//const TeamTask = mongoose.model('TeamTask', teamTaskSchema);
module.exports = teamTaskSchema;
