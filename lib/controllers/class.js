var fs = require('fs'),
    isPng = require('is-png'),
    formidable = require('formidable');

function showClassForm(openBadges) {
    return function (req, res) {
        var BEMHTML = require('../../forms/desktop.bundles/class/class.bemhtml.js').BEMHTML,
            indexBEMJSON = require('../bemjson/class')(openBadges);

        res.send(openBadges.info.hasIssuer ? BEMHTML.apply(indexBEMJSON) : 'Can not create classes without an issuer!');
    };
}

function createClass(openBadges) {
    return function (req, res) {
        var form = new formidable.IncomingForm();

        form.parse(req, function (err, fields, files) {
            if (files.image.size === 0 || !isPng(fs.readFileSync(files.image.path))) {
                return res.send('Bad image! PNG format is expected!');
            }

            var metadata = {
                badgeClass: fields.badgeClass,
                name: fields.name,
                description: fields.description,
                image: files.image.path,
                criteria: fields.criteria
            };

            openBadges.createClass(metadata)
                .then(function (classData) {
                    console.log(classData);

                    if (typeof classData === 'object') {
                        res.redirect('/class');
                    } else {
                        res.send(classData);
                    }
                })
                .fail(function (err) {
                    console.log(err);
                });
        });
    };
}

module.exports = {
    showClassForm: showClassForm,
    createClass: createClass
};
