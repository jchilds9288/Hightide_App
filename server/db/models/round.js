const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');
const User = require('./user');

const roundSchema = new Schema ({
    team: {type: Team, required: true},
    created: {type: Date, default: Date.now},
    goal: {type: Number, require: true}
});

mongoose.model('Round', roundSchema)
module.exports = round;
