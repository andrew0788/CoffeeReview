const Coffee = require('../models/coffee');
const Review = require('../models/review');

module.exports = {
  create,
  newCoffee,
  index,
  show,
  newReview
}

function index(req, res){
  console.log(req.query);
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
  console.log(req.params.id);
  Coffee.findById(req.params.id)
  .populate('reviews').exec(function(err, coffee){
    Review.find({_id:{$nin: coffee.review}})
    .exec(function(err, reviews){
      res.render('coffees/show', {
        title: coffee.name,
        coffee,
        reviews,
        user: req.user,
        name:req.query.name
      });
    });
  });
 }


function newCoffee(req, res){
  Coffee.findById(req.params.id).exec(function(err, coffee){
    res.render('coffees/new', {
      title: 'add coffee',
      coffee,
      user: req.user
    });
  })
}

function create(req, res){
  console.log(req.body)
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
  console.log(req.params.id)
  Coffee.findById(req.params.id).exec(function(err, coffee){
    res.render('reviews/new', {
      title: `Add a review for the ${coffee.name} from ${coffee.roaster}`,
      user: req.user,
      coffee,
    });
  });
}
