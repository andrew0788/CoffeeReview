const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Coffee = require('../models/coffee');
const ObjectId = Schema.Types.ObjectId;

const equipmentSchema= new Schema({
  device: String
});

const userSchema = new Schema({
  name: String,
  email: String,
  avatar: String,
  location: String,
  equipment: [equipmentSchema],
  googleId: String,
  userCoffees: [{type: ObjectId, ref: 'Coffee'}],
}, {
  timestamps: true,
  // typeKey: '$type'
})


module.exports = mongoose.model('User', userSchema)
