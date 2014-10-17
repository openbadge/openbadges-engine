function isAuthorized(req, res) {
    if (!req.isAuthenticated()) {
        res.redirect('/auth');
        return false;
    }

    return true;
}

function isInitialized(openBadges, res) {
    if (!openBadges.initialized) {
        res.send('Initializing of Open Badges is in process... Try a few minutes later!');
        return false;
    }

    return true;
}

module.exports = {
    isAuthorized: isAuthorized,
    isInitialized: isInitialized
};
