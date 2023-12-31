const User = require('../models/userModel');


exports.signup = async (req, res, next) => {
    try {
        await new User(req.body).save();
        res.status(201).end();
    } catch (e) {
        if (e.code === 11000) {
            res.status(404).json({ error: 'Username is not unique' });
        } else {
            res.status(404).json({ error: e.message });
        }
    }

}
