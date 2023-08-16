const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userId: {
        type: String,
        unique: true, 
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    firstname: {
        type: String,
        required:true
    },
    lastname: {
        type: String, 
        required: true
    },
    profilePic: {
        data: Buffer, 
        contentType: String
    },
    follows:[{ type: Schema.Types.ObjectId, ref: 'User' }]
})
module.exports = mongoose.model("User", userSchema);