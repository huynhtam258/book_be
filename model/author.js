const mongoose = require('mongoose');
let Schema = mongoose.Schema
let author = mongoose.model('author',{
    authorName:{
        type:String,
        require: true,
    },
    quote:{
        type:String,
        require: true,
    },
    category:{
        type: Schema.Types.ObjectId,
        ref:'category',
        require: true
    },
    birthDay:{
        type:Date,
        require: true,
    },
    interviewContent:{
        type:String,
        require: true,
    },
    image:{
        type:String,
    }
})
module.exports = {author};