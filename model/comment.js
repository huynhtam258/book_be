const mongoose = require('mongoose');
let Schema = mongoose.Schema
let reviewComment = mongoose.model('comment', {
    contentcomment: {
        type: String,
        require,
    },
    nameReviwer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require,
    },
    date: {
        type: Date,
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