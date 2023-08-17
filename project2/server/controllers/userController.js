const User = require('../models/userModel');
const Tweet = require('../models/tweetModel');
const userInfo = require('../controllers/authController');


exports.tweet = async (req, res, next) => {
    try {
        const postDate = new Date();
        const tweet = await new Tweet({ "userId": req.body.userId, "postedDate": postDate, "tweets": req.body.tweet }).save();
        // const tweet = await new Tweet({"userId": req.body.userId, "postedDate": postDate, "tweets": req.body.tweet}).save();
        res.json(tweet);

    } catch (e) {
        console.log(e.message);
    }
}

exports.search = async (req, res, next) => {
    try {

        const users = await User.find({ "userId": { $regex: `^${req.query.username}`, $options: 'i' } });  //regex: when we keep typing, it keeps searching 

        res.json(users);

    } catch (e) {
        console.log(e.message);
    }
} //Search has to be through username

exports.follow = async (req, res, next) => {
    try {
        const user = await User.findOne({ "userId": userInfo.userId });
        user.follows.push(req.body.followId);
        const followUpdate = await User.updateOne({ "userId": userInfo.userId }, { "follows": user.follows });
        res.json(followUpdate);

    } catch (e) {
        console.log(e.message);
    }
}

exports.unfollow = async (req, res, next) => {
    try {
        const user = await User.findOne({ "userId": userInfo.userId });
        const index = user.follows.indexOf(req.body.unFollowId);
        if (index > -1) {
            user.follows.splice(index, 1);
        }
        const followUpdate = await User.updateOne({ "userId": userInfo.userId }, { "follows": user.follows });
        res.json(followUpdate);
    } catch (e) {
        console.log(e.message);
    }
}

exports.userinfo = async (req, res, next) => {
    try {
        const user = await User.findOne({ "userId": userInfo.userId }).populate('follows');
        res.json(user);
    } catch (e) {
        console.log(e.message);
    }
}

exports.userinfo = async (req, res, next) => {
    try {
        const user = await User.findOne({ "userId": userInfo.userId }).populate('follows');
        console.log("userr", user);
        res.json(user);
    } catch (e) {
        console.log(e.message);
    }
}


exports.displayTweets = async (req, res, next) => {            //not used
    try {
        const followedUser = await User.findOne({ "userId": userInfo.userId });
        console.log("ollList", followedUser.follows);
        const tweets = await Tweet.find({ "userId": userInfo.userId });
        res.json(tweets);
    } catch (e) {
        console.log(e.message);
    }
}


// Profile ma afno matra tweet display garna one more

function getTweets() {

}