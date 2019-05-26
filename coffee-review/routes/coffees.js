var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/users');
var reviewCtrl = require('../controllers/reviews');
var coffeeCtrl = require('../controllers/coffees');
/* GET users listing. */
router.get('/', coffeeCtrl.index);
router.get('/new', isLoggedIn, coffeeCtrl.newCoffee);
router.post('/', isLoggedIn, coffeeCtrl.create);

function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;
