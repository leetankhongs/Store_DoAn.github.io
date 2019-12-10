const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Load User Model
const User = require('../models/userModel');

module.exports = async (passport) =>
{
    passport.use(
        new LocalStrategy({usernameField: 'username'}, async (user, password, done) => {
            //Match User
            user =   await   User.findOne({Email: user})

            if(!user) {
                return done(null, false, {message: 'Email không hợp lê'});
            }

            //Match password
            bcrypt.compare(password, user.Password, (err, isMatch) =>
            {
                if(err) throw err;

                if(isMatch)
                {
                    return done(null, user);
                }
                else
                {
                    return done(null, false, { message: 'Password không chính xác'});
                }

            });     
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
      
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user)=> {
          done(err, user);
        });
    });
}