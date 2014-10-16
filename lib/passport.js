var passport = require('passport');
var fs =require('fs');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (app, admin) {
    passport.use('local', new LocalStrategy(
        function (username, password, done) {
            if (username == admin.username && password == admin.password) {
                return done(null, {
                    username: 'admin'
                });
            }

            return done(null, false, {
                message: 'Invalid username or password!'
            });
        }
    ));

    passport.serializeUser(function (user, done) {
        done(null, JSON.stringify(user));
    });

    passport.deserializeUser(function (data, done) {
        try {
            done(null, JSON.parse(data));
        } catch (e) {
            done(err)
        }
    });
};
