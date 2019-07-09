const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Pool = require('./pool');
const User = require('./user');

const taskSchema = new Schema ({
    title: {type: String, required: true},
    points: {type: Number, required: true},
    proofRequired: {type: Boolean, default: false},
    pool: {type: Pool, default: null},
    user: {type: User, required: true}
});

// schema.methods.getAlbums = function() {
//   return mongoose
//     .model('Album')
//     .find({ songs: this._id })
// }

// schema.methods.getPlaylists = function() {
//   return mongoose
//     .model('Playlist')
//     .find({ playlists: this._id })
// }

mongoose.model('Task', taskSchema)
module.exports = taskSchema;
