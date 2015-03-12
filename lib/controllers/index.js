var fs = require('fs');

function index(storage) {
    return function (req, res) {
        storage.read('openbadges', function (err, openbadges) {
            res.redirect(openbadges.hasIssuer ? '/class' : '/issuer');
        });
    };
}

module.exports = {
    index: index,
    auth: require('./auth'),
    issuer: require('./issuer'),
    klass: require('./class'),
    badge: require('./badge'),
    pass: require('./pass'),
    check: require('./check')
};
