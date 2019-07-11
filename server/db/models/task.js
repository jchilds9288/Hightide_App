const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Pool = require('./pool');
const User = require('./user');

const taskSchema = new Schema ({
    title: {type: String, required: true},
    points: {type: Number, required: true},
    proofRequired: {type: Boolean, default: false},
    pool: {type: Pool, required: false},
    user: {type: User, required: true}
}, {autoIndex: false});


mongoose.model('Task', taskSchema)
module.exports = taskSchema;
