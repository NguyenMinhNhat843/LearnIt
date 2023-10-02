const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        reuired: [true, 'username is required'],
        unique: [true, 'username is unique'],
        minlength: [8, 'username has length euqal 8'],
        maxlength: 50
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: [8, 'password has length equal 8'],
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            , 'Please provide a valid video'
        ]
    }
})

module.exports = mongoose.model('users', UserSchema);