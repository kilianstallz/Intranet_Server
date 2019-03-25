const express = require('express')
const router = express.Router()
const VerifyToken = require('../plugins/verifyToken')

const Item = require('../models/shoppingItem')

router.get('/', VerifyToken, (req, res, next) => {
  Item.find({})
    .populate({
      path: 'creator',
      model: 'User'
    })
    .then(
      response => {
        res.status(200).send(response)
      }
    )
    .catch(e => {
      res.status(500).send({ message: 'Error fetching Items... Try again!' })
      console.log(new Date(), ' ERROR: ' + e)
    })
})

// Get Shopping Items by Creator
router.get('/:id', VerifyToken, (req, res, next) => {
  Item.find({ creator: req.params.id })
    .then(response => {
      res.status(200).send(response)
    })
    .catch(e => {
      res.status(500).send({ message: 'Error fetching Items... Try again!' })
      console.log(new Date(), ' ERROR: ' + e)
    })
})

// Get Single Item

router.get('/item/:id', VerifyToken, (req, res) => {
  Item.findById(req.params.id)
    .then(response => {
      res.status(200).send(response)
    })
    .catch(e => {
      res.status(500).send({ message: 'Error fetching Items... Try again!' })
    })
})
// Create Item
router.post('/item/create', VerifyToken, (req, res, next) => {
  Item.create({
    ...req.body
  })
    .then(item => {
      res.status(201).send(item)
    })
    .catch(e => {
      res.status(500).send({ message: 'Error creating Item... Try again!' })
      console.log(new Date(), ' ERROR: ' + e)
    })
})
// Change Item
router.patch('/item/:id', VerifyToken, (req, res, next) => {
  Item.findByIdAndUpdate(req.params.id, { ...req.body })
    .then(
      Item.findById(req.params.id)
        .then(item => {
          res.status(200).send(item)
        })
    )
})

// Delete Item
router.delete('/item/:id/delete', VerifyToken, (req, res, next) => {
  const { id } = req.params
  Item.findByIdAndDelete(id)
    .then(() => {
      res.status(200).send({ message: 'Object Deleted' })
    })
    .catch(err => console.log(err))
})
module.exports = router
