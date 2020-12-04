const mongoose = require('mongoose');
let Schema = mongoose.Schema
let reviewComment = mongoose.model('comment', {
    contentcomment: {
        type: String,
        require,
    },
    nameReviwer: {
        type: Schema.Types.ObjectId,
        ref: 'Admin',
        require,
    },
    date: {
        type: String,
    },
    rate: {
        type: Number,
    },
    bookId: {
        type: Schema.Types.ObjectId,
        ref: 'book',
        require,
    }
})
module.exports = { reviewComment };