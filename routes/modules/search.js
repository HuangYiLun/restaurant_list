const express = require('express')
const Restaurant = require('../../models/restaurant')
const router = express.Router()

// search restuarnats
router.get('/', (req, res) => {
  const keyword = req.query.keyword
  return Restaurant.find()
    .lean()
    .then(restaurants => {
      restaurants = restaurants.filter(
        restaurant =>
          restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
          restaurant.category.toLowerCase().includes(keyword.toLowerCase())
      )
      res.render('index', { restaurants, keyword })
    })
    .catch(error => console.error(error))
})

module.exports = router
