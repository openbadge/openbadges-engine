var fs = require('fs'),
    http = require('http'),
    app = require('express')(),
    server = http.createServer(app),
    Storage = require('./storage/Storage'),
    port = process.env.PORT || 3000;

var OpenBadges = require('openbadges-issuer-api'),
    utils = require('./utils');

var rawConfig = JSON.parse(fs.readFileSync('config/config.json')),
    badgesStorageConfig = utils.getBadgesStorageConfig(rawConfig.badgesStorage),
    admin = rawConfig.admin;

console.log('Initialization of Open Badges...');

OpenBadges.initialize(badgesStorageConfig)
    .then(function (openbadgesApi) {
        console.log('Initialization of Open Badges finished!');
        console.log(JSON.stringify(openbadgesApi, null, '  '));

        var storage = new Storage();

        storage.write('cookies', [], function () {});
        storage.write('config', openbadgesApi.config, function () {});
        storage.write('openbadges', openbadgesApi.info, function () {
            require('./server')(app, openbadgesApi, storage, admin);

            server.listen(port, '127.0.0.1', function () {
                console.log('Server is listening on port ' + port);
            });
        });
    })
    .fail(function (err) {
        console.log(err);
    });
