const mongoose = require('mongoose');

const { Schema } = mongoose;

const roundSchema = new Schema({
  team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  created: { type: Date, default: Date.now },
  dailyGoal: { type: Number, require: true },
  roundGoal: { type: Number, require: true },
}, { autoIndex: false });

mongoose.model('Round', roundSchema);

module.exports = roundSchema;
