const mongoose = require('mongoose');
const Admin = mongoose.model('Admin');
const passport = require('passport');
const lodash = require('lodash');
const { result } = require('lodash');
// let Admin = require('../model/admin.model');

module.exports.register = (req, res, next) => {
    console.log('Register new admin.');
    var admin = new Admin();
    admin.username = req.body.username;
    admin.password = req.body.password;
    admin.lastname = req.body.lastname;
    admin.firstname = req.body.firstname;
    admin.role = req.body.role;
    admin.save((err, doc) => {
        if(!err) {
            res.send(doc);
        }
        else {
            if(err.code = 11000) {
                res.status(422).send(['Username already exits.']);
            }
            else {
                return next(err);
            }
        }
    });
}

module.exports.authenticate = (req, res, next) => {
    console.log('Log in now!');
    passport.authenticate('local', (err, admin, info) => {
        // Error passport
        if(err) 
            return res.status(400).json(err);
        // Success
        else if(admin){ 
            console.log(admin)
            return res.status(200).json({
                token: admin.generateJwt(),
                user: {
                    username: admin.username, role: admin.role,
                    id:admin._id,
                },
                body: admin
            });
        }
        // Not found
        else
            return res.status(400).json(info);
    })(req, res);
}

module.exports.changePassword = (req, res, next) =>{
    passport.authenticate('local', (err, admin, info) => {
        if(err) 
            return res.status(400).json(err);
        // Success
        else if(admin){ 
            admin.password = req.body.new_password;
            admin.save((err, result)=>{
                return res.send({
                    message:'Changed Password Success',
                    success: true
                })
            })
        }
        else
            return res.status(400).json(info);
    })(req, res);
}

module.exports.updateProfile = (req, res, next) =>{
    passport.authenticate('local', (err, admin, info) => {
        if(err) 
            return res.status(400).json(err);
        // Success
        else if(admin){ 
            // admin.password = req.body.new_password;
            admin.firstname = req.body.firstname,
            admin.password = req.body.password,
            admin.lastname = req.body.lastname
            admin.save((err, result)=>{
                return res.send({
                    message:'Updated Profile Success',
                    success: true
                })
            })
        }
        else
            return res.status(400).json(info);
    })(req, res);
}

module.exports.userProfile = (req, res, next) => {
    console.log('Get user profile!');
    Admin.findById(req.params.id).exec((err, result) => {
        if(err){
            res.send(err)
        }else{
            res.send(result)
        }
    })
    // Admin.findOne({ id: req.params.id}),
    //     (err, admin) => {
    //         if(!admin)
    //             return res.status(404).json({ status: false, message: 'User record not found.' });
    //         else
    //             return res.status(200).send(admin); // Lấy dữ liệu username từ admin đã login
    //     }
}