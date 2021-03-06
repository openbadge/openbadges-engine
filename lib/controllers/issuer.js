var fs = require('fs'),
    isPng = require('is-png'),
    formidable = require('formidable'),
    cache = cache || fs.readFileSync('static/issuer.html', 'utf-8');

function showIssuerForm(storage) {
    return function (req, res) {
        storage.read('openbadges', function (err, openbadges) {
            cache = cache || fs.readFileSync('static/issuer.html', 'utf-8');

            res.send(!openbadges.hasIssuer ? cache : 'The issuer already exists!');
        });
    };
}

function createIssuer(openbadgesApi, storage) {
    return function (req, res) {
        var form = new formidable.IncomingForm();

        form.parse(req, function (err, fields, files) {
            if (files.image.size === 0 || !isPng(fs.readFileSync(files.image.path))) {
                // jscs: disable
                return res.redirect('/issuer?name=' + fields.name + '&url=' + fields.url + '&description=' + fields.description + '&email=' + fields.email);
            }

            var metadata = {
                name: fields.name,
                url: fields.url,
                description: fields.description,
                image: files.image.path,
                email: fields.email
            };

            openbadgesApi.createIssuer(metadata)
                .then(function (issuerData) {
                    console.log(issuerData);

                    storage.read('openbadges', function (err, openbadges) {
                        openbadges.hasIssuer = true;

                        storage.update('openbadges', openbadges, function () {
                            res.redirect('/class');
                        });
                    });
                })
                .fail(function (err) {
                    console.log(err);
                });
        });
    };
}

module.exports = {
    showIssuerForm: showIssuerForm,
    createIssuer: createIssuer
};
