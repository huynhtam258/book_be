const mongoose = require('mongoose');
let Schema = mongoose.Schema
let bookCategory = mongoose.model('category',{
    categoryName:{
        type:String,
        require,
    }
})
module.exports = {bookCategory};