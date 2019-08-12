const mongoose = require('mongoose');

const { Schema } = mongoose;
const User = require('./user');

const accountSchema = new Schema({
  name: { type: String, required: true },
  created: { type: Date, default: Date.now },
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

mongoose.model('Account', accountSchema);
module.exports = accountSchema;
