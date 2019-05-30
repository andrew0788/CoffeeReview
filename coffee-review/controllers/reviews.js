const Coffee = require('../models/coffee');
const User = require('../models/user');
const Review = require('../models/review');
module.exports ={
  show,
  addReview,
  remove
}

function addReview(req, res){
  Coffee.findById(req.params.id, function(err, coffee){
    User.findById(req.user.id, function(err, user){
      console.log(req.user.id);
      req.body.author = req.user.id;
      let review = new Review(req.body);
      review.save(function(err){
        if (err) return res.render('coffees/new');
      coffee.reviews.push(review._id);
      coffee.save(function(err){
        res.redirect(`/coffees/${coffee.id}`)
       });
      });
    });
  });
}

function show(req, res) {
    console.log('this ran' + coffee);
    res.render('/reviews/new', {
      coffee: req.params.id,
      user: req.user,
      name: req.query.name,
      title: ""
    });
}

function remove(req, res){
  Coffee.findOne({ 'reviews._id': req.params.id }, function(err, coffee){
    coffee.reviews.id(req.params.id).remove();
    coffee.save(function(err){
      res.redirect('/coffees');
    });
  });
}
