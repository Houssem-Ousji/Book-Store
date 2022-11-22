const mongoose = require('mongoose')

const Schema = require('mongoose').Schema

const userSchema = new Schema({
    firstName : {
        type: String,
        required : [true,'first Name is required']
    },
    lastName : {
        type: String,
        required : [true,'last Name is required']
    },
    userName : {
        type: String,
        required : [true,'User Name is required']
    },
    email : {
        type : String,
        match : [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please add a valid email"
        ],
        required : [true,'email is required']
    },
    password : {
        type : String,
        minLength : [8, "Password must be atleast 8"],
        required : [true,'password is required']
    },
    role : {
        type : String,
        enum : ['user','admin'],
        default : 'user'
    },
    orderNumber : {
        type : Number,
        default : 0
    }
},{timestamps:true})

const user = mongoose.model("user",userSchema)
module.exports = user