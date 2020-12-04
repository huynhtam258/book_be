const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

var Admin = mongoose.model('Admin');

passport.use(
    new localStrategy({ usernameField: 'username' }, // usernameField: 'email'
        (username, password, done) => { // khi yêu cầu authen thì arrow func này sẽ được chạy
            Admin.findOne({ username: username }, // email: username
                (err, admin) => {
                    if(err)
                        return done(err);
                    else if (!admin)
                        return done(null, false, { message: 'Admin not found' });
                    else if (!admin.verifyPassword(password)) // verifyPassword mehod viết bên admin model
                        return done(null, false, { message: 'Wrong Password' });
                    else
                        return done(null, admin);
                }
            );
        }
    )
);