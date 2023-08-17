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
        const userId = req.user
        const loggedInUser = await User.findOne({ _id: userId });
        const users = await User.find({
            "_id": {
                $not: {
                    $eq: userId
                },
            },
            "userId": {
                $regex: `^${req.query.username}`,
                $options: 'i'
            }
        });  //regex: when we keep typing, it keeps searching 

        const modifiedUsers = users.map(u => ({
            ...u._doc, isFollowed: loggedInUser.follows.includes(u._id)
        }))
        res.json(modifiedUsers);

    } catch (e) {
        console.log(e.message);
    }
} //Search has to be through username

exports.follow = async (req, res, next) => {
    try {
        const { followId } = req.body
        const userId = req.user
        const user = await User.findOne({ _id: userId });

        user.follows.push(followId);
        const followUpdate = await User.updateOne({ _id: userId }, { "follows": user.follows });
        res.json(followUpdate);

    } catch (e) {
        console.log(e.message);
    }
}

exports.unfollow = async (req, res, next) => {
    try {
        const { unFollowId } = req.body
        const userId = req.user
        const user = await User.findOne({ _id: userId });

        const index = user.follows.indexOf(unFollowId);
        if (index > -1) {
            user.follows.splice(index, 1);
        }
        const followUpdate = await User.updateOne({ "_id": userId }, { "follows": user.follows });
        res.json(followUpdate);
    } catch (e) {
        console.log(e.message);
    }
}

exports.userinfo = async (req, res, next) => {
    try {
        const userId = req.user
        const user = await User.findOne({ "_id": userId }).populate('follows');
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