var fs = require('fs'),
    isAuthorized = require('./checks').isAuthorized;

function index(req, res) {
    if (!isAuthorized(req, res)) { return; }

    res.send(fs.readFileSync('forms/desktop.bundles/index/index.html', 'utf-8'));
}

module.exports = {
    index: index,
    auth: require('./auth'),
    issuer: require('./issuer'),
    class: require('./class'),
    badge: require('./badge'),
    backpack: require('./backpack')
};
