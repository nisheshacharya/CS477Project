const Tweet = require('../models/tweetModel');
const express = require('express');

// Controller for getting all tweets of a logged-in user


exports.getAllTweets = async (req, res) => {
    
    try {
        const tweets = await Tweet.find().sort({ postedDate: -1 }).populate('userId', 'firstname');
        res.json({ tweets });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching user tweets.' });
    }
};


exports.getAllTweetsByUser = async (req, res) => {
    const userId = req.user;    
    try {
        const tweets = await Tweet.find({ userId }).sort({ postedDate: -1 }).populate('userId', 'firstname');
        res.json({ tweets });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching user tweets.' });
    }
};



exports.postTweet = async (req, res, next) => {
    const { tweet } = req.body;
   

    const userId = req.user;     // authorization code. We set in authController, we get it while loggin in
    console.log("userId", userId)
    const postedDate = new Date();

    try {
        const newTweet = await Tweet.create({ userId: userId, postedDate, tweet }); //didn't even know there is .create function :D 
        res.json(newTweet);
    } catch (error) {
        console.log("Error", error)
        res.status(500).json({ error: 'An error occurred while posting the tweet.' });
    }
}

