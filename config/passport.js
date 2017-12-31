var passport = require('passport');
var steamStrategy = require('passport-steam').Strategy;

passport.serializeUser(function(user, done) {

  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new steamStrategy({
    returnURL: 'http://localhost:8000/auth/return',
    realm: 'http://localhost:8000/',
    apiKey: '7B2DC8969F0F1EC23600CBC572B1C658'
  },
  function(identifier, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {

      // To keep the example simple, the user's Steam profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Steam account with a user record in your database,
      // and return that user instead.
      profile.identifier = identifier;
      return done(null, profile);
    });
  }
));
