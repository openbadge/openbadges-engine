var fs = require('fs');

function auth(req, res) {
    if (req.isAuthenticated()) {
        res.redirect('/');
        return;
    }

    res.send(fs.readFileSync('forms/desktop.bundles/auth/auth.html', 'utf-8'));
}

function checkAuth(passport) {
    return passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth' })
}

function signOut(req, res) {
    req.logout();
    res.redirect('/auth');
}

module.exports = {
    auth: auth,
    checkAuth: checkAuth,
    signOut: signOut
}
