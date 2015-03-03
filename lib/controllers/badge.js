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
function _createBadge(data, openBadges, storage, callback) {
    /**
     * Requests to the given url until it returns 200
     * @param {String} url
     * @param {Function} callback
     */
    function _checkRequest(url, callback) {
        setTimeout(function () {
            request
                .get(url)
                .on('response', function(response) {
                    if (response.statusCode !== 200) {
                        console.log('Request to ' + url + ' --> ' + response.statusCode);
                        _checkRequest(url, callback);
                    } else {
                        console.log('Request to ' + url + ' --> 200');
                        callback();
                    }
                });
        }, 10000);
    }

    storage.read('openBadges', function (err, _res) {
        var _openBadges = JSON.parse(_res),
            classes = _openBadges.info.classes,
            indexOfClass = -1;

        for (var i = 0; i < classes.length; i++) {
            if (classes[i].name === data.name) {
                indexOfClass = i;
                break;
            }
        }

        if (indexOfClass === -1) return callback(null, 'No such Badge Class!');

        openBadges.createBadge({
            name: data.name,
            email: data.email
        })
            .then(function (badgeData) {
                console.log(badgeData);

                if (typeof badgeData !== 'object') return callback(null, badgeData);

                storage.read('openBadges', function (err, _res) {

                    var earnerUrl = _openBadges.config.storage + '/award.html?' + data.name + '=' + badgeData.uid;

                    classes[indexOfClass].badges.push(badgeData.uid);


                    storage.update('openBadges', JSON.stringify(_openBadges), function () {
                        _checkRequest(badgeData.verify.url, function () {
                            callback(null, earnerUrl);
                        });
                    });
                });
            })
            .fail(callback);
    });
}

function showManualAwarfingForm(storage) {
    return function (req, res) {
        storage.read('openBadges', function (err, _res) {
            var openBadges = JSON.parse(_res);

            var classes = openBadges.info.classes;

            if (!classes.length) return res.send('Can not create badges without classes!');

            var BEMHTML = require('../../forms/desktop.bundles/badge/badge.bemhtml.js').BEMHTML,
                badgeBEMJSON = require('../bemjson/manual-awarding')(openBadges);

            res.send(BEMHTML.apply(badgeBEMJSON));
        });
    };
}

function awardBadgeManually(openBadges, storage) {
    return function (req, res) {
        var data = req.body;
        _createBadge(data, openBadges, storage, function (err, url) {
            if (err) { console.log(err); }

            res.send(url);
        });
    };
}

function awardBadge(openBadges, storage) {
    return function (req, res) {
        var body = req.body;

        if (!jws.verify(body.signature, SECRET)) return res.send('Invalid secret key!');

        var payload = JSON.parse(jws.decode(body.signature).payload);

        _createBadge(payload, openBadges, storage, function (err, url) {
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
