const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema ({
    title: {type: String, required: true},
    points: {type: Number, required: true},
    proofRequired: {type: Boolean, default: false}
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

module.exports = mongoose.model('Task', taskSchema)
