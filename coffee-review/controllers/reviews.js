const Coffee = require('../models/coffee');
const User = require('../models/user');

module.exports ={
  show,
  createReview
}

function createReview(req, res){
  Coffee.findById(req.params.id, function(err, coffee){
    coffee.reviews.push(req.body);
    coffee.save(function(err){
      res.redirect(`/coffees/${coffee._id}`);
    });
  });
}

function show(req, res) {
    console.log(req.query);
    res.redirect('/reviews/new', {
      coffee: req.params.id,
      user: req.user,
      name: req.query.name,
      title: ""
    });
}
