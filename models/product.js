const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
  title: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  imageUrl: {
    type: String,
    require: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  }
})

const productModel = mongoose.model('products', productSchema)

module.exports = productModel;