const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const reviewSchema = new Schema({
  coffee: String,
  flavorNotes: String,
  score: Number,
  brewStyle: String,
  reviewText: String,
  author: {type: ObjectId, ref: 'User'}
  
})


module.exports = mongoose.model('Review', reviewSchema)
