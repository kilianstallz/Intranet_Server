const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    trim: true,
    required: true
  },
  quantity: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date
  }
})

itemSchema.pre('save', function (next) {
  let now = new Date()
  if (!this.createdAt) {
    this.createdAt = now
  }
  next()
})

const ShoppingItem = mongoose.model('ShoppingItem', itemSchema)

module.exports = ShoppingItem
