var isInitialized = require('./utils').isInitialized;

function sendAward(openBadges) {
    return function (req, res) {
        if (!isInitialized(openBadges, res)) { return; }

        var badge = req.query.badge,
            createdClasses = openBadges.info.createdClasses,
            url = '';

        for (var i in createdClasses) {
            if (createdClasses[i].indexOf(badge) > -1) {
                url = openBadges.config.host + '/' + i + '/' + badge + '/' + badge + '.json';
                break;
            }
        }

        var BEMHTML = require('../../forms/desktop.bundles/badge/badge.bemhtml.js').BEMHTML;

        var html = BEMHTML.apply({
            block: 'page',
            title: 'Award',
            scripts: [
                { elem: 'js', url: 'https://backpack.openbadges.org/issuer.js' }
            ],
            content:
            {
                tag: 'script',
                content: 'OpenBadges.issue_no_modal([\'' + url + '\'], function(err, suc) {});'
            }
        });

        res.send(html);
    }
}

module.exports = {
    sendAward: sendAward
}
