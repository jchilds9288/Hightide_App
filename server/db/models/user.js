const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  },
  password: {
    type: {
      id: String,
      token: String
    },
    required: true
  },
  role: {
    type: String, required: true,
    trim: true,
    default: 'student'
  }
}, {autoIndex: false});

UserSchema.set('toJSON', {getters: true, virtuals: true});

UserSchema.pre('save', function (next) {
  console.log('pre saving..')
  console.log(JSON.stringify(this))

  let user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return next(err);

      // hash the password along with our new salt
      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);

          // override the cleartext password with the hashed one
          user.password = hash;
          next();
      });
  });
});

UserSchema.methods.comparePassword = (candidatePassword, cb) =>  {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) =>  {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};


mongoose.model("User", UserSchema);

module.exports = UserSchema;
