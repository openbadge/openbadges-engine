var request = require('request');

function isAuthenticated(storage) {
    return function (req, res, next) {
        var authCookie = req.cookies['auth_cookie']; // jshint ignore:line
        storage.read('cookies', function (err, cookies) {
            if (cookies.indexOf(authCookie) === -1) {
                res.redirect('/auth');

                return;
            }

            next();
        });
    };
}

function classExistence(storage) {
    return function (req, res) {
        storage.read('openbadges', function (err, openbadges) {
            var classes = openbadges.classes;
                name = req.body.name.replace(/\+/g, ' ').trim().replace(/( )+/, '_');

            var existsClass = false;

            for (var item in classes) {
                if (classes[item].name === name) {
                    existsClass = true;
                    break;
                }
            }

            res.send(existsClass ? 'Exists!' : 'Ok!');
        });
    };
}

function urlExistence() {
    return function (req, res) {
        var url = (/^http(s)?:\/\/(.*)$/.test(req.body.url) ? '' : 'http://') + req.body.url;

        request(url, function (err, response, body) {
            res.send(err || response.statusCode !== 200 ? 'Bad!' : 'Ok!');
        });
    };
}

module.exports = {
    isAuthenticated: isAuthenticated,
    classExistence: classExistence,
    urlExistence: urlExistence
};
