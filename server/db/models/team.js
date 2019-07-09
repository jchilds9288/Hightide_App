const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const teamSchema = new Schema ({
    name: {
      type: String,
      required: true
    },
    members: {
      type: [User],
      required: true,
      default: []
    },
    created: {
      type: Date,
      default: Date.now
    }
});

module.exports = mongoose.model('Team', teamSchema)
