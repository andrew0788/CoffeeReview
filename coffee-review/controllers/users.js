const User = require('../models/user');

module.exports ={
  index,
  privateView
}

function index(req, res){
  res.render('index', {
    user: req.user,
    name: req.query.name,
    tile: 'Welcome to OAUth'
  });
}

function privateView(res, req){
  res.send("you should not be here");
}
