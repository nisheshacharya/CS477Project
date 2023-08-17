const express = require('express');
const router = express.Router();

const tweetController = require('../controllers/tweetController');

// Get all tweets
router.get('/auth-user', tweetController.getAllTweetsByUser);
router.get('/', tweetController.getAllTweets);



// Post a new tweet (requires logged-in user)
router.post('/', tweetController.postTweet);

module.exports = router;