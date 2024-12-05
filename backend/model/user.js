const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    userID : {
        type : String,
        required : true,
    },
    username : {
        type : String,
        required : true
    },
    userprofile : {
       type: String ,
       default : ''
    },
    content: {
        type: String,
        required: true, 
    },
    image: {
        type: String,
        default: '', 
    },
    like: {
        type: Number, 
        default: 0,   
    },
    createdAt: {
        type: Date,
        default: Date.now, 
    }
});


const userSchema = new mongoose.Schema({
    
    username: {
        type: String,
        required: true, 
        unique: true,   
    },
    bio: {
        type: String,
        default : '' 
    },
    email: {
        type: String,
        required: true,
        unique: true,   
    },
    password: {
        type: String,
        required: true,
    },
    profilePhoto: {
        type: String,  
        default: '',   
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',  
    }],
    saved: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post', 
    }],
    posts: [postSchema],  
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
