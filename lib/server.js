var serveStatic = require('serve-static'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    passport = require('passport'),
    controllers = require('./controllers');

module.exports = function (app, openBadges) {
    app.use(serveStatic(process.cwd()));

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
    app.use(passport.initialize());
    app.use(passport.session());

    app.get('/auth', controllers.auth.showAuthForm);
    app.get('/sign-out', controllers.auth.signOut);
    app.post('/auth', controllers.auth.checkAuth());

    app.get('/issuer', controllers.issuer.showIssuerForm(openBadges));
    app.post('/issuer', controllers.issuer.createIssuer(openBadges));

    app.get('/class', controllers.class.showClassForm(openBadges));
    app.post('/class', controllers.class.createClass(openBadges));

    app.get('/manual-awarding', controllers.badge.showManualAwarfingForm(openBadges));
    app.post('/manual-awarding', controllers.badge.awardBadgeManually(openBadges));

    app.post('/awarding', controllers.badge.awardBadge(openBadges));

    // send to backpack
    app.get('/award', controllers.backpack.sendAward(openBadges));

    // main
    app.get('/', controllers.index);
};
