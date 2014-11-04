var fs = require('fs'),
    argv = require('optimist').argv,
    cocaine = require('cocaine'),
    http = cocaine.spawnedBy() ? cocaine.http : require('http'),
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
    .then(function (openBadges) {
        console.log('Initialization of Open Badges finished!');
        console.log(JSON.stringify(openBadges, null, '  '));

        var storage = new Storage();
        storage.write('openBadges', JSON.stringify(openBadges), function () {
            require('./server')(app, openBadges, storage, admin);

            if (cocaine.spawnedBy()) {
                var W = new cocaine.Worker(argv),
                    handle = W.getListenHandle('http');

                server.listen(handle, function () {
                    console.log('listening on cocaine handle');
                });
            } else {
                server.listen(port, function () {
                    console.log('Server is listening on port ' + port);
                });
            }
        });
    })
    .fail(function (err) {
        console.log(err);
    });
