const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const teamSchema = new Schema ({
    name: {type: String, required: true},
    members: [User],
    created: {type: Date, default: Date.now}
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

module.exports = mongoose.model('Team', teamSchema)
