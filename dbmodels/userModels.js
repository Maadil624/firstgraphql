const mongoose = require('mongoose')
const userModel = new mongoose.Schema({
    name: {
        type: String,
        // required:[true,'name is required']
    },
    age: {
        type: Number,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // required: [true, 'email is required']
    },
    dep: {
        type: String,
    },
    loc: {
        type: String,
    },
})

const LoginModel = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})


const addUserModel = mongoose.model('users', userModel)
const getuserModel = mongoose.model('users', userModel)
const userLoginModel = mongoose.model('userslogin', LoginModel)
module.exports = {
    addUserModel,
    userLoginModel,
    getuserModel
}