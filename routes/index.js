var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
    //console.log(req.user);
  res.render('index', { title: 'Express', user: req.user });
});



module.exports = router;
