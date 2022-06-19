const mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        min: [4, 'Too short, min is 4 characters'],
        max: [32, 'Too long, max is 32 characters']
    },

    email: {
        type: String,
        min: [4, 'Too short, min is 4 characters'],
        max: [32, 'Too long, max is 32 characters'],
        unique: true,
        lowercase: true,
        required: 'Email is Required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },

    password: {
        type: String,
        min: [4, 'Too short, min is 4 characters'],
        max: [32, 'Too long, max is 32 characters'],
        // required: 'Password is Required',
    },

    firstname: {
        type: String,

    },

    lastname: {
        type: String,

    },


    joined: {
        type: Date,
        default: Date.now,
    },
  
    profilePic: {
        type: String,
    },

    googleId: {
        type: String
    }
});

const User = mongoose.model("user", UserSchema);
module.exports = User;