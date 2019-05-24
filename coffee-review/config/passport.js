const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User= require('../models/user');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK,
}, function(accessToken, refreshToken, profile, cb) {
  //a use has logged in with  OAUth
  User.findOne({ googleId: profile.id }, function(err, user){
    if (err) return cb(err);
    if (user) {
      return cb(null, user);
    } else{
      let newUser = new User(){
        name: profile.displayName,
        email: profile.emails[0]. value,
        googleId: profile.id
      }}
      newUser.Save(function(err){
        if (err) return cb(err);
        return cb(null, newStudent);
      })
  })
}
));

passport.serializeUser(function(user, cb){
  cb(null, user.id);
});

passport.deserializeUser(funciton(id, cb){
  User.findById(id, funciton(err, user){
    cb(err, user)
  })
})
