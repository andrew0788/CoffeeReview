const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  equipment: [String],
  title: String,
  googleId: String
}, {
  timestamps: true
})


module.exports = mongoose.model('User', userSchema)
