var path = require('path'),
    serveStatic = require('serve-static'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    passport = require('passport'),
    controllers = require('./controllers');

module.exports = function (app, openBadges, storage, admin) {
    app
        .use(serveStatic(path.join(process.cwd(), 'static')))

        .use(bodyParser.urlencoded({ extended: false }))
        .use(bodyParser.json())

        .use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }))
        .use(passport.initialize())
        .use(passport.session())

        .use(['/issuer', '/class', '/manual-awarding'], controllers.check.isAuthenticated)

        .get('/auth', controllers.auth.showAuthForm(storage))
        .get('/sign-out', controllers.auth.signOut)
        .get('/', controllers.index(storage))
        .get('/issuer', controllers.issuer.showIssuerForm(storage))
        .get('/class', controllers.klass.showClassForm(storage))
        .get('/manual-awarding', controllers.badge.showManualAwarfingForm(storage))

        .post('/auth', controllers.auth.checkAuth())
        .post('/issuer', controllers.issuer.createIssuer(openBadges, storage))
        .post('/class', controllers.klass.createClass(openBadges, storage))
        .post('/manual-awarding', controllers.badge.awardBadgeManually(openBadges, storage))
        .post('/awarding', controllers.badge.awardBadge(openBadges, storage))
        .post('/check-class-existence', controllers.check.classExistence(storage))

        .get('/openBadges', function (req, res) {
            storage.read('openBadges', function (err, _res) {
                var _openBadges = JSON.parse(_res);
                res.send(JSON.stringify(_openBadges, null, '  '));
            });
        });

    passport.use('local', controllers.pass.createLocalStrategy(admin));
    passport.serializeUser(controllers.pass.serializeUser);
    passport.deserializeUser(controllers.pass.deserializeUser);
};
