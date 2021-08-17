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
  User.findByIdAndUpdate(req.user.id, function(err, user){
    console.log("update" + req.body);
    user.equipment.push(req.body);
    if (err){
      console.log('error at user update');
      res.redirect('/users/<%= user._id %>');
    } else {
      user.save(function(err){
        if (err) return res.render('coffees/new');
        res.redirect('/coffees');
      });
    };
  });
}

function privateView(res, req){
  res.send("you should not be here");
}

function show(req, res){
  User.findById(req.params.id).populate({path: 'coffee', select: 'userCoffees'}).exec(function(err, user){
    Review.find({author: req.params.id}).exec(function(err, reviews){
      console.log(reviews );
  res.render('users/show', {
    user: req.user,
    name: req.query.name,
    title: `${req.user.name}'s profile`
  });
  });
});
}
