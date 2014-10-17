var fs = require('fs'),
    express = require('express'),
    OpenBadges = require('openbadges-issuer-api'),
    utils = require('./utils');

var app = express();

var rawConfig = JSON.parse(fs.readFileSync('config/config.json')),
    badgesStorageInfo = utils.parseConfig(rawConfig.badgesStorage),
    adminInfo = rawConfig.admin;

console.log('Initializing of Open Badges...');

var openBadges = new OpenBadges(badgesStorageInfo);

require('./server')(app, openBadges);
require('./passport')(app, adminInfo);

app.listen(3000);
console.log('Server is listening on port 3000. Point your browser to http://localhost:3000/');
