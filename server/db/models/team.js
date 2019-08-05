const mongoose = require('mongoose');

const { Schema } = mongoose;

const teamSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    default: [],
  }],
  pendingMembers: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    default: [],
  }],
  created: {
    type: Date,
    default: Date.now,
  },
}, { autoIndex: false });

mongoose.model('Team', teamSchema);
module.exports = teamSchema;
