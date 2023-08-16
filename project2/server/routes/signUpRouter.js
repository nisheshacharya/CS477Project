const express = require('express');
const signUpController = require('../controllers/signUpController');

const router = express.Router();


router.post('/', signUpController.signup);


module.exports = router;