const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  coffee: String,
  flavorNotes: {
    type: [String]
  },
  score: Number,
  brewStyle: String,
  reviewText: String,
  creator: String,
  reviewDate: {
    type: Number,
    default: function(){
      return new Date()
    },
  }
})


module.exports = mongoose.model('Review', reviewSchema)
