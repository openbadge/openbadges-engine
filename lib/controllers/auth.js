var fs = require('fs'),
    passport = require('passport'),
    cache = cache || fs.readFileSync('static/auth.html', 'utf-8');

function showAuthForm(req, res) {
    if (req.isAuthenticated()) return res.redirect('/');

    cache = cache || fs.readFileSync('static/auth.html', 'utf-8');

    res.send(cache);
}

function checkAuth() {
    return passport.authenticate('local', {
        successRedirect: '/'
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
