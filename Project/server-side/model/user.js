const mongoose = require('mongoose');
const {Schema} = mongoose; 

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  followers: [],
  followings: [],
  tweets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tweet' }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
