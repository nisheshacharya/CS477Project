const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const privateSecret = 'MSD-CS477';


exports.login = async (req, res, next) => {
    const user = await User.findOne(req.body);
    if (user) {
        const token = jwt.sign({ userId: user._id }, privateSecret);
        res.status(200).json({ token });
    } else {
        res.status(401).json({ error: 'username or password is invalid' });
    }
}

exports.authorize = (req, res, next) => {
    // console.log(req.headers);
    const authorization = req.headers.authorization;
    if (authorization) {
        const token = authorization.split(' ')[1];
        jwt.verify(token, privateSecret, (err, user) => {
            if (err) {
                res.status(403).json({ error: 'Unauthorized' })
            } else {
                console.log("user", user)
                req.user = user.userId;     //Will use it  in tweet controller,.. 
              
                next();
            }
        });
    } else {
        res.status(401).json({ error: 'Please login' });
    }
}

exports.authorizeAdmin = (req, res, next) => {
    if (req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ error: 'Unauthorized' })
    }
}


