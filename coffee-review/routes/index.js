var express = require('express');
var router = express.Router();
const passport = require('passport');
const usersCtrl = require('../controllers/users');

router.get('/protected', isLoggedIn, usersCtrl.privateView);

/* GET home page. */
router.get('/', usersCtrl.index);


//Google Oauth login routes
router.get('/auth/google', passport.authenticate(
  'google',
  {scope: ['profile', 'email']}
));

//Google Oauth Callback Router
router.get('/coffeeReviewOAuth', passport.authenticate(
  'google',
  {
    successRedirect: '/coffees',
    failureRedirect: '/'
  }
));

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/')
});

//Helper function for protecting pages
function isLoggedIn(req, res, next){
  if (req.isAuthenticated()) return next;
  res.redirect('/auth/google')
}
module.exports = router;
