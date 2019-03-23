const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  createdAt: {
    type: Date
  }
})

userSchema.pre('save', function (next) {
  let now = new Date()
  if (!this.createdAt) {
    this.createdAt = now
  }
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
