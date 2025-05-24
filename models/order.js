const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
  product: [{
    productData:{
      type: Object,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  }],
  user: [{
    username: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'users'
    }
  }]
})

const orderModel = mongoose.model('Order', orderSchema)

module.exports = orderModel