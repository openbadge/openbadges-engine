var fs = require('fs'),
    _ = require('lodash'),
    express = require('express'),
    bodyParser = require('body-parser'),
    formidable = require('formidable'),
    jws = require('jws'),
    request = require('request'),
    OpenBadges = require('../../openbadges-issuer-api/lib/index'),
    utils = require('./utils');

function checkRequest(url, callback) {
    request(url, function (err, response, req) {
        if (response.statusCode !== 200) {
            setTimeout(function () {
                console.log('Request to ' + url + ' --> ' + response.statusCode);
                checkRequest(url, callback);
            }, 1000);
        } else {
            console.log('Request to ' + url + ' --> 200');
            callback();
        }
    });
}

function createBadge(body, callback) {
    var badgeData = openBadges.createBadge({
        name: body.name,
        email: body.email
    });

    checkRequest(badgeData.verify.url, function () {
        var earnerUrl = 'http://localhost:3000/badges?earner=';

        callback(typeof badgeData === 'object' ? earnerUrl + badgeData.uid : badgeData);
    });
}

// Server
console.log('Starting a server...');

var app = express(),
    config = JSON.parse(fs.readFileSync('config/config.json'));

var HOST = config['gh-pages'],
    REPOSITORY = config.repository,
    SECRET = utils.getSecretKey('private-key.pem');

console.log('Initializing the Open Badges...');

var openBadges = new OpenBadges(HOST, REPOSITORY);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/issuer', function (req, res) {
    res.send(
        !openBadges.hasIssuer ? fs.readFileSync('forms/issuer.html', 'utf-8') : 'The issuer already exists!'
    );
});

app.post('/issuer', function (req, res, next) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
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
});

app.get('/class', function (req, res) {
    res.send(
        openBadges.hasIssuer ? fs.readFileSync('forms/class.html', 'utf-8') : 'Can not create class without an issuer!'
    );
});

app.post('/class', function (req, res, next) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        var metadata = {
            badgeClass: fields.badgeClass,
            name: fields.name,
            description: fields.description,
            image: files.image.path,
            criteria: fields.criteria
        };

        var classData = openBadges.createClass(metadata);

        res.send(typeof classData === 'object' ? 'Ok!' : classData);
    });
});

app.get('/manual-awarding', function (req, res) {
    var createdClasses = Object.keys(openBadges.createdClasses),
        size = createdClasses.length < 10 ? createdClasses.length : 10;

    res.send(
        _.template(fs.readFileSync('forms/manual-awarding.html', 'utf-8'), { size: size + 1, names: createdClasses })
    );
});

app.post('/manual-awarding', function (req, res) {
    createBadge(req.body, function (url) {
        res.send(url);
    });
});

app.post('/awarding', function (req, res) {
    if (jws.verify(req.body.signature, SECRET)) {
        var payload = JSON.parse(jws.decode(req.body.signature).payload);

        createBadge(payload, function (url) {
            res.send(url);
        });
    } else {
        res.send('Invalid secret key!');
    }
});

app.get('/badges', function (req, res) {
    var earner = req.query.earner,
        createdClasses = openBadges.createdClasses,
        url = '';

    for (var i in createdClasses) {
        if (createdClasses[i].indexOf(earner) > -1) {
            url = HOST + '/' + i + '/' + earner + '/' + earner + '.json';
            break;
        }
    }

    res.send(
        url ? _.template(fs.readFileSync('forms/openbadges.html', 'utf-8'), { badgeUrl: url }) : 'No such badge!'
    );
});

app.get('/', function (req, res) {
    res.send('Wellcome to Open Badges!');
});

app.listen(3000);
console.log('Server is listening on port 3000. Point your browser to http://localhost:3000/');
