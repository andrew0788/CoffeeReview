const User = require('../models/user');

module.exports = {
  index,
  update,
  privateView
}

function index(req, res, next){
  console.log(req.query);
  res.render('index', {
    user: req.user,
    name: req.query.name,
    title: ""
  });
}

function update(res, req){
  res.redirect('users/update', {
    user: req.use,
    name: req.query.name,
    title: ''
  });
}

function privateView(res, req){
  res.send("you should not be here");
}
