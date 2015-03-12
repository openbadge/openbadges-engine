var fs = require('fs'),
    isPng = require('is-png'),
    formidable = require('formidable');

function showClassForm(storage) {
    return function (req, res) {
        storage.read('openbadges', function (err, openbadges) {
            var BEMHTML = require('../../forms/desktop.bundles/class/class.bemhtml.js').BEMHTML,
            indexBEMJSON = require('../bemjson/class')(openbadges);

            // jscs: disable
            res.send(openbadges.hasIssuer ? BEMHTML.apply(indexBEMJSON) : 'Can not create classes without an issuer!');
        });
    };
}

function createClass(openbadgesApi, storage) {
    return function (req, res) {
        var form = new formidable.IncomingForm();

        form.parse(req, function (err, fields, files) {
            if (files.image.size === 0 || !isPng(fs.readFileSync(files.image.path))) {
                // jscs: disable
                return res.redirect('/class?name=' + fields.name + '&description=' + fields.description + '&criteria=' + fields.criteria);
            }

            var metadata = {
                badgeClass: fields.badgeClass,
                name: fields.name,
                description: fields.description,
                image: files.image.path,
                criteria: fields.criteria
            };

            openbadgesApi.createClass(metadata)
                .then(function (classData) {
                    console.log(classData);

                    storage.read('openbadges', function (err, openbadges) {
                        if (typeof classData === 'object') {
                            // jscs: disable
                            openbadges.classes.unshift({ name: classData.name.trim().replace(/( )+/g, '_'), badges: [] });
                            storage.update('openbadges', openbadges, function () {
                                res.redirect('/class');
                            });
                        } else {
                            res.send(classData);
                        }
                    });
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
