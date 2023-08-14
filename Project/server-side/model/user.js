const mongoose = require('mongoose');
const {Schema} = mongoose; 

const mongoose = require('mongoose');

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
  tweets: [],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
