const express = require('express');
const mongoose = require('mongoose');
// const router = require('')

const app = express();

app.use(express.json())







mongoose.connect('mongodb://localhost:27017/project')
    .then(app.listen(3000, () => {
        console.log('Listening on 3000')
    }))