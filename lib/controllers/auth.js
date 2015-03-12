var fs = require('fs'),
    passport = require('passport'),
    cache = cache || fs.readFileSync('static/auth.html', 'utf-8');

function showAuthForm(storage) {
    return function (req, res) {
        var authCookie = req.cookies['auth_cookie']; // jshint ignore:line
        storage.read('cookies', function (err, cookies) {
            if (cookies.indexOf(authCookie) === -1) {
                cache = cache || fs.readFileSync('static/auth.html', 'utf-8');

                res.send(cache);
            } else {
                storage.read('openbadges', function (err, openbadges) {
                    res.redirect(openbadges.hasIssuer ? '/class' : '/issuer');
                });
            }
        });
    };
}

function checkAuth() {
    return passport.authenticate('local');
}

function signOut(storage) {
    return function (req, res) {
        var authCookie = req.cookies['auth_cookie']; // jshint ignore:line
        storage.read('cookies', function (err, cookies) {
            cookies.splice(cookies.indexOf(authCookie), 1);
            storage.update('cookies', cookies, function () {
                req.logout();
                res.redirect('/auth');
            });
        });
    };
}

module.exports = {
    showAuthForm: showAuthForm,
    checkAuth: checkAuth,
    signOut: signOut
};
