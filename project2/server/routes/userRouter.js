const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();



router.post("/tweet", userController.tweet);
router.get("/search", userController.search);
router.put("/follow", userController.follow);
router.put("/unfollow", userController.unfollow);
router.get("/userinfo", userController.userinfo);
router.get("/displayTweet", userController.displayTweets);

module.exports = router;