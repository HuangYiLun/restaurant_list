const express = require('express')
const Restaurant = require('../../models/restaurant')
const router = express.Router()

router.get('/', (req, res) => {
  return Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

module.exports = router
