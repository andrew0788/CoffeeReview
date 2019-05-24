const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Review = require('Review');

const coffeeSchema = new Schema({
  name: String,
  roaster: String,
  region: String,
  description: String,
  reviews: [Review.reviewSchema]
})


module.exports = mongoose.model('Coffee', coffeeSchema)
