var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET users listing. */

router.get('/account', ensureAuthenticated, function(req, res, next) {
    //console.log('ok');
    console.log(req.user);
    res.render('account', {data: req.user, picUrl: req.user.photos[2].value});
});


router.get('/logout', ensureAuthenticated, function (req, res, next) {
    req.logout();
    res.redirect('/');
});

router.get('/', notAuthenticated, function (req, res, next) {
    next();
});

router.get('/signin', function(req, res, next) {
    res.render('signin');
});


router.get('/auth',
    passport.authenticate('steam', { failureRedirect: '/user/signin' }),
    function(req, res) {
        res.redirect('/user/signin');
    });

// GET /auth/steam/return
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/auth/return',
    // Issue #37 - Workaround for Express router module stripping the full url, causing assertion to fail
    function(req, res, next) {
        req.url = req.originalUrl;
        req.session.userSession = req.user;
        console.log(req.session.userSession);
        next();
    },
    passport.authenticate('steam', { failureRedirect: '/signin' }),
    function(req, res) {
        res.redirect('/');
    });

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/');
}

function notAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

module.exports = router;
