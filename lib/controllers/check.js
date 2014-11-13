function isAuthenticated(storage) {
    return function (req, res, next) {
        var authCookie = req.cookies['auth_cookie'];
        storage.read('cookies', function (err, _res) {
            var cookies = JSON.parse(_res);

            if (cookies.indexOf(authCookie) === -1) {
                res.redirect('/auth');

                return;
            }

            next();
        });
    }
}

function classExistence(storage) {
    return function (req, res) {
        storage.read('openBadges', function (err, _res) {
            var openBadges = JSON.parse(_res);

            var classes = openBadges.info.classes;
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

module.exports = {
    isAuthenticated: isAuthenticated,
    classExistence: classExistence
};
