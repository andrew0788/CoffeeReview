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

function update(res, req){
  res.redirect('users/update', {
    user: req.user,
    name: req.query.name,
    title: ''
  });
}

function privateView(res, req){
  res.send("you should not be here");
}

function show(req, res){
  console.log(req.params.id);
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
