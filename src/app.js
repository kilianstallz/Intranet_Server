const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const cors = require('cors')
require('./config/db')

const app = express()

// CONFIG
app.use(cors({
  origin: '*'
}))
// Logging and Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(logger('dev'))
// CONFIG END

// IMPORT CONTROLLERS
const AuthController = require('./controllers/Auth')
const ShoppingController = require('./controllers/Shopping')

// Authentication
app.use('/intranet/', AuthController)
// app.use('/api/user', UserController)
// Shopping List
app.use('/intranet/shopping', ShoppingController)

// Handle ERRORS
// 404
app.use((req, res, next) => {
  let err = new Error('Route not found!')
  next(err)
})
app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).json({ message: 'Not Found!' })
  } else {
    // Undefined Error
    res.status(500).json({ message: 'Something went wrong...' })
  }
})

module.exports = app
