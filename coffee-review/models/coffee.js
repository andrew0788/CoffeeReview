const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const Review = require('./review');

const coffeeSchema = new Schema({
  name: {
    type: String,
    // required: true,
  },
  region: String,
  roaster: {
    type: String,
    required: true,
  },
  description: String,
  reviews: [{type: ObjectId, ref: 'Review'}],
  link: String,
  creator: String,
  imageLink: String
})


module.exports = mongoose.model('Coffee', coffeeSchema)
