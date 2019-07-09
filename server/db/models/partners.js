const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');
const Round = require('./round');
const Team = require('./team');

const partnerSchema = new Schema ({
    user1: {type: User, required: true},
    user2: {type: User, required: true},
    round: {type: Round, required: true},
    team: {type: Team, required: true}
});

mongoose.model('Partner', partnerSchema)
module.exports = partnerSchema;
