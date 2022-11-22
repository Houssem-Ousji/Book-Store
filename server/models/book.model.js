const mongoose = require('mongoose')
const Schema = require('mongoose').Schema

const bookSchema = new Schema({
    bookName : {
        type : String,
        required : [true,'the book Name is required']
    },
    author : {
        type : String,
        required : [true,'the author is required']
    },
    releasedDate : {
        type : Date,
    },
    description : {
        type : String
    },
    price : {
        type : Number,
        required : [true,'the price is required']
    },
    avaibility : {
        type : Boolean,
        default : true
    },
    numCopySales : {
        type : Number,
        default : 0
    }
},{timestamps : true})

const book = mongoose.model('book',bookSchema)
module.exports = book