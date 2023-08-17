const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const signUpRouter = require("./routes/signUpRouter");
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const tweetRouter = require("./routes/tweetRouter");


//instantiation
const app = express();

//middleware
app.use(cors());
app.use(express.json());

app.use('/signup', signUpRouter);
app.use(authRouter);
app.use('/users', userRouter);
app.use('/tweets', tweetRouter)





//db startup
mongoose.connect("mongodb://127.0.0.1:27017/Tweet")
    .then(() => {
        app.listen(3001, () => console.log("listening on port 3001"));
    });