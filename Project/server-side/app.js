const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());


const userRouter = require('./router/userRouter'); 
const tweetRouter = require('./router/tweetRouter'); 


app.use('/api/users', userRouter);
app.use('/api/tweets', tweetRouter);

console.log('connecting to mongodb')
try {
    mongoose.connect('mongodb://127.0.0.1:27017/finalProject')
        .then(() => {
            app.listen(3100, () => {
                console.log('Listening on port 3100');
            });
        })
        .catch(error => {
            console.error('Error connecting to MongoDB:', error);
        });
} catch (error) {
    console.error('Error connecting to MongoDB:', error);
}