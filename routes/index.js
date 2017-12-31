var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', user: req.user });
});

router.get('/signin', function(req, res, next) {
  res.render('signin');
});


router.get('/auth',
  passport.authenticate('steam', { failureRedirect: '/signin' }),
  function(req, res) {
    res.redirect('/signin');
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

module.exports = router;
