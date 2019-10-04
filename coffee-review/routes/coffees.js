var express = require('express');
var router = express.Router();
var coffeeCtrl = require('../controllers/coffees');
/* GET users listing. */
router.get('/', coffeeCtrl.index);
router.get('/new', isLoggedIn, coffeeCtrl.newCoffee);
router.get('/:id', coffeeCtrl.show);
router.post('/', isLoggedIn, coffeeCtrl.create);
router.get('/:id/reviews', isLoggedIn, coffeeCtrl.newReview)
router.delete('/:id', coffeeCtrl.delCoffee)

function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;
