var fs = require('fs');
    isPng = require('is-png'),
    formidable = require('formidable'),
    isAuthorized = require('./utils').isAuthorized,
    isInitialized = require('./utils').isInitialized;

function showClassForm(openBadges) {
    return function (req, res) {
        if (!isAuthorized(req, res) || !isInitialized(openBadges, res)) { return; }

        var html = fs.readFileSync('forms/desktop.bundles/class/class.html', 'utf-8');

        res.send(openBadges.info.hasIssuer ? html : 'Can not create classes without an issuer!');
    }
}

function createClass(openBadges) {
    return function (req, res) {
        if (!isAuthorized(req, res) || !isInitialized(openBadges, res)) { return; }

        var form = new formidable.IncomingForm();

        var html = fs.readFileSync('forms/desktop.bundles/class/class.html', 'utf-8');

        form.parse(req, function (err, fields, files) {
            if (files.image.size === 0 || !isPng(fs.readFileSync(files.image.path))) {
                res.send('Bad image! PNG format is expected!');
                return;
            }

            var metadata = {
                badgeClass: fields.badgeClass,
                name: fields.name,
                description: fields.description,
                image: files.image.path,
                criteria: fields.criteria
            };

            var classData = openBadges.createClass(metadata);

            res.send(typeof classData === 'object' ? html : classData);
        });
    }
}

module.exports = {
    showClassForm: showClassForm,
    createClass: createClass
}
