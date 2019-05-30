const Coffee = require('../models/coffee');
const Review = require('../models/review');
const User = require('../models/user');

module.exports = {
  create,
  newCoffee,
  index,
  show,
  newReview,
  deleteCoffee
}

function index(req, res){
  console.log(req.query.id);
  Coffee.find({}, function(err, coffees){
    res.render('coffees/index', {
      title:'Search Coffees',
      coffees,
      user: req.user,
      name: req.query.name,
   });
  })
}

function show(req, res){
  Coffee.findById(req.params.id)
  .populate('reviews').exec(function(err, coffee){
    Review.find({_id:{$nin: coffee.reviews}})
    .populate('author').exec(function(err, reviews){
      console.log('this' + reviews);
      res.render('coffees/show', {
        title: coffee.name,
        coffee,
        user: req.user,
        name:req.query.name
      });
    });
  });
 }

function newCoffee(req, res){
  Coffee.findById(req.params.id).populate('reviews').exec(function(err, coffee){
    console.log(coffee);
    res.render('coffees/new', {
      title: 'add coffee',
      coffee,
      user: req.user
    });
  })
}

function create(req, res){
  for (let key in req.body){
    if (req.body[key] === '') delete req.body[key];
  }
  let coffee = new Coffee(req.body);
  coffee.save(function(err){
    if (err) return res.render('coffees/new');
    console.log(coffee);
    res.redirect('/coffees');
  });
}

function newReview(req, res){
  Coffee.findById(req.params.id).exec(function(err, coffee){
    console.log(coffee);
    res.render('reviews/new', {
      title: `Add a review for ${coffee.name} by ${coffee.roaster}`,
      user: req.user,
      name: req.query.name,
      coffee,
    });
  });
}

function deleteCoffee(req, res, next) {
  User.findOne({'coffees._id': req.params.id}), function(err, user) {
    user.coffees.id(req.params.id).remove();
    user.save(function(err) {
      res.redirect('/user');
    });
  };
}
