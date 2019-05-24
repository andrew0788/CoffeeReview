const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  coffee: ObjectId
  flavorNotes: {
    type: [notes]
  },
  score: Integer,
  brewStyle: String,
  reviewText: String,
  creator: ObjectId
})


module.exports = mongoose.model('Review', reviewSchema)
