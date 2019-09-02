const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: { type: String, required: true },
  points: { type: Number, required: true },
  proofRequired: { type: Boolean, required: false },
  created: {
    type: Date,
    default: Date.now,
  },
  pool: {
    type: String,
    default: 'Happy',
  }
}, { autoIndex: false });


mongoose.model('Task', taskSchema);
module.exports = taskSchema;
