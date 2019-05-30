const User = require('../models/user');
const Coffee = require('../models/coffee');
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
  Coffee.findById({'coffees.author': req.user}).populate('reviews').exec(function(err, coffee){
      console.log(coffee);
    })
  res.render('users/show', {
    user: req.user,
    name: req.query.name,
    title: `${req.user.name}'s profile`
  });
 };
