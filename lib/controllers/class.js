var fs = require('fs'),
    isPng = require('is-png'),
    formidable = require('formidable');

function showClassForm(storage) {
    return function (req, res) {
        storage.read('openBadges', function (err, _res) {
            var openBadges = JSON.parse(_res);

            var BEMHTML = require('../../forms/desktop.bundles/class/class.bemhtml.js').BEMHTML,
            indexBEMJSON = require('../bemjson/class')(openBadges);

            res.send(openBadges.info.hasIssuer ? BEMHTML.apply(indexBEMJSON) : 'Can not create classes without an issuer!');
        });
    };
}

function createClass(openBadges, storage) {
    return function (req, res) {
        var form = new formidable.IncomingForm();

        form.parse(req, function (err, fields, files) {
            if (files.image.size === 0 || !isPng(fs.readFileSync(files.image.path))) {
                return res.redirect('/class?name=' + fields.name + '&description=' + fields.description + '&criteria=' + fields.criteria);
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

                    storage.read('openBadges', function (err, _res) {
                        var _openBadges = JSON.parse(_res);
                        if (typeof classData === 'object') {
                            _openBadges.info.classes.unshift({ name: classData.name.trim().replace(/( )+/g, '_'), badges: [] });
                            storage.write('openBadges', JSON.stringify(_openBadges), function () {
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
