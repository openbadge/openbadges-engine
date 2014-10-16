var fs = require('fs'),
    isPng = require('is-png'),
    formidable = require('formidable'),
    isAuthorized = require('./utils').isAuthorized,
    isInitialized = require('./utils').isInitialized;

function showIssuerForm(openBadges) {
    return function (req, res) {
        if (!isAuthorized(req, res) || !isInitialized(openBadges, res)) { return; }

        if (!openBadges.initialized) {
            res.send('Initializing of Open Badges is in process... Try a few minutes later!')
            return;
        }

        var html = fs.readFileSync('forms/desktop.bundles/issuer/issuer.html', 'utf-8');

        res.send(!openBadges.info.hasIssuer ? html : 'The issuer already exists!');
    }
}

function createIssuer(openBadges) {
    return function (req, res) {
        if (!isAuthorized(req, res) || !isInitialized(openBadges, res)) { return; }

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

            openBadges.createIssuer(metadata);

            res.redirect('/class');
        });
    }
}

module.exports = {
    showIssuerForm: showIssuerForm,
    createIssuer: createIssuer
}
