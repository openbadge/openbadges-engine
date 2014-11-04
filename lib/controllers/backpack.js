var BEMHTML = require('../../forms/desktop.bundles/badge/badge.bemhtml.js').BEMHTML;

function sendAward(storage) {
    return function (req, res) {
        storage.read('openBadges', function (err, _res) {
            /**
             * Returns a verify url of a badge
             * @param {Object} classes
             * @param {String} storage
             * @returns {String}
             */
            function getAwardUrl(classes, storage) {
                for (var item in classes) {
                    if (classes[item].badges.indexOf(badge) > -1) {
                        return [storage, classes[item].name, badge + '.json'].join('/');
                    }
                }

                return '';
            }

            var openBadges = JSON.parse(_res);

            var badge = req.query.badge,
                url = getAwardUrl(openBadges.info.classes, openBadges.config.storage);

            var html = BEMHTML.apply({
                block: 'page',
                title: 'Award',
                content: [
                    { elem: 'js', url: 'https://backpack.openbadges.org/issuer.js' },
                    { elem: 'js', content: 'OpenBadges.issue_no_modal([\'' + url + '\'], function(err, suc) {});' }
                ]
            });

            res.send(html);
        });
    };
}

module.exports = {
    sendAward: sendAward
};
