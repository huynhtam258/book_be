const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
// const Schema = mongoose.Schema;

var AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: 'Username cannot be empty',
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [4, 'Password must be lasted 4 characters long']
    },
    lastname: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'user',
    },
    saltAuthen: String
});


// Hash password
AdminSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, null, null,(err,hash)=>{
        // bcrypt.hash(this.password, (err, hash) => {
            this.password = hash;
            this.saltAuthen = salt;
            next();
        });
    });
});

// Verify password
AdminSchema.methods.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// Jwt
AdminSchema.methods.generateJwt = function() {
    return jwt.sign({ _id: this._id },
        process.env.JWT_SECRET,
    {
        expiresIn: process.env.JWT_EXP
    });
}

// module.exports = mongoose.model('users', UserSchema);

mongoose.model('Admin', AdminSchema);
// module.exports = mongoose.model('Admin', AdminSchema);