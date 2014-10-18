var fs = require('fs'),
    passport = require('passport');

function showAuthForm(req, res) {
    if (req.isAuthenticated()) {
        res.redirect('/');
        return;
    }

    res.send(fs.readFileSync('forms/desktop.bundles/auth/auth.html', 'utf-8'));
}

function checkAuth() {
    return passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth'
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
