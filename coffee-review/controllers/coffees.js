const Coffee = require('../models/coffee');


module.exports = {
  create,
  newCoffee,
  index
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
  Coffee.findById(req.params.id)
  .populate('reviews').exec(function(err, coffees){
    Review.find({_id:{$nin: coffees.review}})
    .exec(function(err, reviews){
      res.render('coffees/show', {
        title: "", coffees, reviews
      });
    });
  });
 }


function newCoffee(req, res){
  Coffee.findById(req.params.id).exec(function(err, coffees){
    res.render('coffees/new', { title: 'add coffee', coffees });
  })
}

function create(res, res){
  console.log(req.body);
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
