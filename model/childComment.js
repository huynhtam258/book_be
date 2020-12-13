const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let childComment = mongoose.model('childComment', {
    id_comment: {
        type: Schema.Types.ObjectId,
        ref: 'comment'
    },
    id_user: {
        type: Schema.Types.ObjectId,
        ref: 'admin'
    },
    contentChild: {
        type: String
    },
    date: {
        type: Date
    }
})

module.exports = { childComment };