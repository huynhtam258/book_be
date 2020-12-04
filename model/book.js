const mongoose = require('mongoose');
let Schema = mongoose.Schema
let book = mongoose.model('book',{
    bookName:{
        type:String,
        require: true,
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: 'author',
        require: true,
    },
    releaseDate:{
        type:String,
        require: true,
    },
    bookContent:{
        type:String,
        require: true,
    },
    image:{
        type:String,
    }
})
module.exports = {book};