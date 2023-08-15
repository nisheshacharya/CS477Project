const mongoose = require('mongoose');
const { Schema } = mongoose;

const tweetSchema = new Schema({
  content: {
    type: String,
  },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;
