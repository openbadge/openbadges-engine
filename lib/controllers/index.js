var fs = require('fs'),
    utils = require('../utils');

function index(openBadges) {
    return function (req, res) {
        res.redirect(openBadges.info.hasIssuer ? '/class' : '/issuer');
    };
}

module.exports = {
    index: index,
    auth: require('./auth'),
    issuer: require('./issuer'),
    klass: require('./class'),
    badge: require('./badge'),
    backpack: require('./backpack'),
    pass: require('./pass'),
    check: require('./check')
};
