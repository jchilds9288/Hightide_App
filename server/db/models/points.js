const mongoose = require('mongoose');

const { Schema } = mongoose;

const pointsSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  round: { type: Schema.Types.ObjectId, ref: 'Round', required: true },
  created: { type: Date, default: Date.now },
  task: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
}, { autoIndex: false });

mongoose.model('Points', pointsSchema);

module.exports = pointsSchema;
