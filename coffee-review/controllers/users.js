const User = require('../models/user');
const Coffee = require('../models/coffee');
const Review = require('../models/review');
module.exports = {
  index,
  update,
  show,
  privateView
}

function index(req, res, next){
  res.render('index', {
    user: req.user,
    name: req.query.name,
    title: ""
  });
}

function update(req, res){
  User.findById(req.user.id, function(err, user){
    console.log("update" + req.body);
    user.equipment.push(req.body.equipment);
    if (err){
      console.log('error at user update');
      res.redirect('/coffees');
    } else {
      user.equipment.save();
      res.redirect('/coffees')
    };
  });
}

function privateView(req, res){
  res.send("you should not be here");
}

function show(req, res){
  Coffee.find({creator: req.params.id}).populate('reviews').exec(function(err, coffees){
  Review.find({author: req.params.id}).exec(function(err, reviews){
    console.log(reviews );
  res.render('users/show', {
    coffees,
    reviews,
    user: req.user,
    name: req.query.name,
    title: `${req.user.name}'s profile`
  });
  });
});
}
