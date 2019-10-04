const Coffee = require('../models/coffee');
const Review = require('../models/review');
const User = require('../models/user');

module.exports = {
  create,
  newCoffee,
  index,
  show,
  newReview,
  delCoffee
}

function index(req, res){
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
  console.log('here');
  Coffee.findById(req.params.id)
  .populate('reviews').exec(function(err, coffee){
    Review.find({_id:{$nin: coffee.reviews}})

      res.render('coffees/show', {
        title: coffee.name,
        coffee,
        user: req.user,
        name:req.query.name
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
  console.log(req.body);
  for (let key in req.body){
    if (req.body[key] === '') delete req.body[key];
  }
  req.body.author = req.user.id;
  let coffee = new Coffee(req.body);
  coffee.save(function(err){
    if (err) return res.render('coffees/new');
    res.redirect('/coffees');
  });
}

function newReview(req, res){
  Coffee.findById(req.params.id).exec(function(err, coffee){
    res.render('reviews/new', {
      title: `Add a review for ${coffee.name} by ${coffee.roaster}`,
      user: req.user,
      name: req.query.name,
      coffee,
    });
  });
}

function delCoffee(req, res, next) {
  Coffee.findByIdAndRemove(req.params.id, function(err, coffee){
    if (err){
      console.log("error");
      throw error;
    } else {
      console.log(coffee);
      res.redirect('/coffees');
    }
  })
}
