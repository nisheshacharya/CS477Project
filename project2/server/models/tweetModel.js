const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tweetSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    postedDate: Date,
    tweets: String
})

module.exports = mongoose.model("Tweet", tweetSchema);