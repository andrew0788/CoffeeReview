const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Review = require('./review');

const coffeeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  region: String,
  roaster: {
    type: String,
    required: true,
  },
  description: String,
  reviews: [{type:Schema.Types.ObjectId, ref:'Review'}],
})


module.exports = mongoose.model('Coffee', coffeeSchema)
