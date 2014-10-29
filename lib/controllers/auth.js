var fs = require('fs'),
    passport = require('passport'),
    cache = cache || fs.readFileSync('static/auth.html', 'utf-8');

function showAuthForm(openBagdes) {
    return function (req, res) {
        if (req.isAuthenticated()) return res.redirect(openBagdes.info.hasIssuer ? '/class' : '/issuer');

        cache = cache || fs.readFileSync('static/auth.html', 'utf-8');

        res.send(cache);
    }
}

function checkAuth(openBagdes) {
    return passport.authenticate('local', {
        successRedirect: openBagdes.info.hasIssuer ? '/class' : '/issuer'
    });
}

function signOut(req, res) {
    req.logout();
    res.redirect('/auth');
}

module.exports = {
    showAuthForm: showAuthForm,
    checkAuth: checkAuth,
    signOut: signOut
};
