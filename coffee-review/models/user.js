const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Coffee = require('../models/coffee');
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
  name: String,
  email: String,
  avatar: String,
  location: String,
  equipment: [String],
  googleId: String,
  userCoffees: [{type: ObjectId, ref: 'Coffee'}],
}, {
  timestamps: true
})


module.exports = mongoose.model('User', userSchema)
