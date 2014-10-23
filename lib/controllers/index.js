var fs = require('fs'),
    utils = require('../utils');

function index(openBadges) {
    return function (req, res) {
        var BEMHTML = require('../../forms/desktop.bundles/index/index.bemhtml.js').BEMHTML,
            indexBEMJSON = require('../bemjson/index')(openBadges);

        res.send(BEMHTML.apply(indexBEMJSON));
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
