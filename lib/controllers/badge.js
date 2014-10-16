var fs = require('fs');
    jws = require('jws'),
    isPng  = require('is-png'),
    request = require('request'),
    formidable = require('formidable'),
    utils = require('../utils'),
    isAuthorized = require('./utils').isAuthorized,
    isInitialized = require('./utils').isInitialized;

var SECRET = utils.getSecretKey('private-key.pem');

/**
 * Creates badge
 * @param {Object} [data]
 * @param {String} [data.name]
 * @param {String} [data.name]
 * @param {Function} callback
 */
function _createBadge(data, openBadges, callback) {
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

    var badgeData = openBadges.createBadge({
        name: data.name,
        email: data.email
    });

    if (typeof badgeData !== 'object') {
        callback(badgeData);
        return;
    }

    _checkRequest(badgeData.verify.url, function () {
        var earnerUrl = 'http://localhost:3000/award?badge=';

        callback(earnerUrl + badgeData.uid);
    });
}

function showManualAwarfingForm(openBadges) {
    return function (req, res) {
        if (!isAuthorized(req, res) || !isInitialized(openBadges, res)) { return; }

        var badgeBEMJSON = require('../bemjson/manual-awarding');

        /**
         * Returns the list of options from created classes for block 'select'
         * @createdClasses {Object} createdClasses
         * @returns {Object}
         */
        function getOptions(createdClasses) {
            var first = createdClasses[0];
            return createdClasses.map(function (_class) {
                return {
                    val: _class,
                    text: _class.replace(/_/g, ' '),
                    checked: first === _class ? true : false
                };
            });
        }

        var createdClasses = Object.keys(openBadges.info.createdClasses);
        if (!createdClasses.length) {
            res.send('Can not create badges without classes!');
            return;
        }

        var BEMHTML = require('../../forms/desktop.bundles/badge/badge.bemhtml.js').BEMHTML,
            _badgeBEMJSON = utils.deepCopy(badgeBEMJSON);

        _badgeBEMJSON.content[1].content.splice(2, 0, {
            block: 'select',
            mods: { mode: 'radio', theme: 'normal', size: 'm' },
            name: 'name',
            options: getOptions(createdClasses)
        });

        var html = BEMHTML.apply(_badgeBEMJSON);

        res.send(html);
    }
}

function awardBadgeManually(openBadges) {
    return function (req, res) {
        if (!isAuthorized(req, res) || !isInitialized(openBadges, res)) { return; }

        var form = new formidable.IncomingForm();

        form.parse(req, function (err, fields) {
            _createBadge(fields, openBadges, function (url) {
                res.send(url);
            });
        });
    }
}

function awardBadge(openBadges) {
    return function (req, res) {
        if (!isInitialized(openBadges, res)) { return; }

        if (jws.verify(req.body.signature, SECRET)) {
            var payload = JSON.parse(jws.decode(req.body.signature).payload);

            _createBadge(payload, openBadges, function (url) {
                res.send(url);
            });
        } else {
            res.send('Invalid secret key!');
        }
    }
}

module.exports = {
    showManualAwarfingForm: showManualAwarfingForm,
    awardBadgeManually: awardBadgeManually,

    awardBadge: awardBadge
}
