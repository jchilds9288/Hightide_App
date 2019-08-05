const mongoose = require('mongoose');

const { Schema } = mongoose;

const partnerSchema = new Schema({
  user1: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  user2: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  round: { type: Schema.Types.ObjectId, ref: 'Round', required: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
});

mongoose.model('Partner', partnerSchema);

module.exports = partnerSchema;
