var fs = require('fs'),
    passport = require('passport'),
    cache = cache || fs.readFileSync('static/auth.html', 'utf-8');

function showAuthForm(storage) {
    return function (req, res) {
        /* jshint ignore:start */
        var authCookie = req.cookies['auth_cookie'];
        /* jshint ignore:end */
        storage.read('cookies', function (err, _res) {
            var cookies = _res;

            if (cookies.indexOf(authCookie) === -1) {
                cache = cache || fs.readFileSync('static/auth.html', 'utf-8');

                res.send(cache);
            } else {
                storage.read('openBadges', function (err, _res) {
                    var openBagdes = JSON.parse(_res);

                    res.redirect(openBagdes.info.hasIssuer ? '/class' : '/issuer');
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
        /* jshint ignore:start */
        var authCookie = req.cookies['auth_cookie'];
        /* jshint ignore:end */
        storage.read('cookies', function (err, _res) {
            var cookies = JSON.parse(_res);
            cookies.splice(cookies.indexOf(authCookie), 1);
            storage.update('cookies', JSON.stringify(cookies), function () {
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
