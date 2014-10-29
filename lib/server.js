var path = require('path'),
    serveStatic = require('serve-static'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    passport = require('passport'),
    controllers = require('./controllers');

module.exports = function (app, openBadges, admin) {
    app
        .use(serveStatic(path.join(process.cwd(), 'static')))

        .use(bodyParser.urlencoded({ extended: false }))
        .use(bodyParser.json())

        .use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }))
        .use(passport.initialize())
        .use(passport.session())

        .use(['/issuer', '/class', '/manual-awarding'], controllers.check.isAuthenticated)

        .get('/auth', controllers.auth.showAuthForm(openBadges))
        .get('/sign-out', controllers.auth.signOut)
        .get('/', controllers.index(openBadges))
        .get('/issuer', controllers.issuer.showIssuerForm(openBadges))
        .get('/class', controllers.klass.showClassForm(openBadges))
        .get('/manual-awarding', controllers.badge.showManualAwarfingForm(openBadges))
        .get('/award', controllers.backpack.sendAward(openBadges))

        .post('/auth', controllers.auth.checkAuth(openBadges))
        .post('/issuer', controllers.issuer.createIssuer(openBadges))
        .post('/class', controllers.klass.createClass(openBadges))
        .post('/manual-awarding', controllers.badge.awardBadgeManually(openBadges))
        .post('/awarding', controllers.badge.awardBadge(openBadges))
        .post('/check-class-existence', controllers.check.classExistence(openBadges))

        .get('/openBadges', function (req, res) {
            res.send(JSON.stringify(openBadges, null, '  '));
        });

    passport.use('local', controllers.pass.createLocalStrategy(admin));
    passport.serializeUser(controllers.pass.serializeUser);
    passport.deserializeUser(controllers.pass.deserializeUser);
};
