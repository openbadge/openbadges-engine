var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

function createLocalStrategy(admin) {
    return new LocalStrategy(
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
    );
}

function serializeUser(user, done) {
    done(null, JSON.stringify(user));
}

function deserializeUser(data, done) {
    try {
        done(null, JSON.parse(data));
    } catch (e) {
        done(err);
    }
}

module.exports = {
    createLocalStrategy: createLocalStrategy,
    serializeUser: serializeUser,
    deserializeUser: deserializeUser
};
