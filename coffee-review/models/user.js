const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Coffee = require('../models/coffee');
const ObjectId = Schema.Types.ObjectId;
const Autopopulate = require('mongoose-autopopulate');

const equipmentSchema = new Schema({
  device: String
});
mongoose.model('equipment', equipmentSchema)

const userSchema = new Schema({
  name: String,
  email: String,
  avatar: String,
  location: String,
  equipment: [{ type: ObjectId, ref: 'equipment'}],
  userCoffees: [{type: ObjectId, ref: 'Coffee'}],
  isRoaster: Boolean,
  googleId: String,
}, {
  timestamps: true,
  // typeKey: '$type'
});
userSchema.plugin(Autopopulate);


module.exports = mongoose.model('User', userSchema)
