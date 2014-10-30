var fs = require('fs'),
    jws = require('jws'),
    isPng = require('is-png'),
    request = require('request'),
    formidable = require('formidable'),
    utils = require('../utils');

var SECRET = utils.getSecretKey('private-key.pem');

/**
 * Creates badge
 * @param {Object} [data]
 * @param {String} [data.name]
 * @param {String} [data.name]
 * @param {Object} openBadges
 * @param {String} host
 * @param {Function} callback
 */
function _createBadge(data, openBadges, host, callback) {
    /**
     * Requests to the given url until it returns 200
     * @param {String} url
     * @param {Function} callback
     */
    function _checkRequest(url, callback) {
        request(url, function (err, response, req) {
            if (response.statusCode !== 200) {
                setTimeout(function () {
                    console.log('Request to ' + url + ' --> ' + response.statusCode);
                    _checkRequest(url, callback);
                }, 1000);
            } else {
                console.log('Request to ' + url + ' --> 200');
                callback();
            }
        });
    }

    openBadges.createBadge({
        name: data.name,
        email: data.email
    })
        .then(function (badgeData) {
            console.log(badgeData);

            if (typeof badgeData !== 'object') return callback(null, badgeData);

            _checkRequest(badgeData.verify.url, function () {
                var earnerUrl = [host, 'award?badge='].join('/');

                callback(null, earnerUrl + badgeData.uid);
            });
        })
        .fail(callback);
}

function showManualAwarfingForm(openBadges) {
    return function (req, res) {
        var classes = openBadges.info.classes;

        if (!classes.length) return res.send('Can not create badges without classes!');

        var BEMHTML = require('../../forms/desktop.bundles/badge/badge.bemhtml.js').BEMHTML,
            badgeBEMJSON = require('../bemjson/manual-awarding')(openBadges);

        res.send(BEMHTML.apply(badgeBEMJSON));
    };
}

function awardBadgeManually(openBadges) {
    return function (req, res) {
        _createBadge(req.body, openBadges, req.headers.host, function (err, url) {
            if (err) { console.log(err); }

            res.send(url);
        });
    };
}

function awardBadge(openBadges) {
    return function (req, res) {
        var body = req.body;

        if (!jws.verify(body.signature, SECRET)) return res.send('Invalid secret key!');

        var payload = JSON.parse(jws.decode(body.signature).payload);

        _createBadge(payload, openBadges, req.headers.host, function (err, url) {
            if (err) { console.log(err); }

            res.send(url);
        });
    };
}

module.exports = {
    showManualAwarfingForm: showManualAwarfingForm,
    awardBadgeManually: awardBadgeManually,

    awardBadge: awardBadge
};
