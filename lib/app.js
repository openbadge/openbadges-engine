var fs = require('fs'),
    express = require('express'),
    OpenBadges = require('openbadges-issuer-api'),
    utils = require('./utils');

var app = express();

var rawConfig = JSON.parse(fs.readFileSync('config/config.json')),
    badgesStorageConfig = utils.getBadgesStorageConfig(rawConfig.badgesStorage),
    admin = rawConfig.admin;

console.log('Initialization of Open Badges...');

OpenBadges.initialize(badgesStorageConfig)
    .then(function (openBadges) {
        console.log('Initialization of Open Badges finished!');
        console.log(JSON.stringify(openBadges, null, '  '));

        require('./server')(app, openBadges, admin);

        app.listen(3000);

        console.log('Server is listening on port 3000. Point your browser to http://localhost:3000/');
    })
    .fail(function (err) {
        console.log(err);
    });
