const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const VerifyToken = require('../plugins/verifyToken')

const User = require('../models/User')

// Add User
router.post('/user/add', (req, res) => {
  User.create({
    name: req.body.name
  })
    .then(user => {
      const token = jwt.sign({ id: user._id }, process.env.SECRET, {
        expiresIn: '7d'
      })
      return { user, token }
    })
    .then(data => res.status(201).send({ auth: true, ...data }))
    .catch(e => {
      res.status(500).send({ message: 'Error adding the user...' })
      console.log(new Date() + ' ERROR: ' + e)
    })
})

// Get User Data
router.get('/user/me', VerifyToken, (req, res, next) => {
  User.findById(req.userId, { password: 0 })
    .then(user => {
      if (!user) return res.status(404).send({ message: 'No user found.' })
      res.status(200).send(user)
    })
    .catch(e => {
      res.status(500).send({ message: 'Error finding the user...' })
      console.log(new Date() + ' ERROR: ' + e)
    })
})

// Login
router.post('/user/login', (req, res) => {
  console.log(req.body)
  User.findOne({ name: req.body.name })
    .then(user => {
      console.log(user)
      const passwordIsValid = (process.env.PASSWORD === req.body.password)
      console.log(passwordIsValid)
      if (!user) return res.status(404).send('No user found!')
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null })
      var token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: 86400 })
      res.status(200).send({ auth: true, token, user })
    })
    .catch(e => {
      res.status(500).send({ message: 'Error while authenticating...' })
      console.log(new Date() + ' ERROR: ' + e)
    })
})

// Logout
router.get('/user/logout', (req, res) => {
  res.status(200).send({ auth: false, token: null })
})

module.exports = router
