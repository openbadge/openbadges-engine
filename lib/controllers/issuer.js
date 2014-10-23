var fs = require('fs'),
    isPng = require('is-png'),
    formidable = require('formidable'),
    cache = cache || fs.readFileSync('static/issuer.html', 'utf-8');

function showIssuerForm(openBadges) {
    return function (req, res) {
        cache = cache || fs.readFileSync('static/issuer.html', 'utf-8');

        res.send(!openBadges.info.hasIssuer ? cache : 'The issuer already exists!');
    };
}

function createIssuer(openBadges) {
    return function (req, res) {
        var form = new formidable.IncomingForm();

        form.parse(req, function (err, fields, files) {
            if (files.image.size === 0 || !isPng(fs.readFileSync(files.image.path))) {
                res.send('Bad image! PNG format is expected!');
                return;
            }

            var metadata = {
                name: fields.name,
                url: fields.url,
                description: fields.description,
                image: files.image.path,
                email: fields.email
            };

            openBadges.createIssuer(metadata)
                .then(function (issuerData) {
                    console.log(issuerData);

                    res.redirect('/class');
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
