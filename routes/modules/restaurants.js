const express = require('express')
const Restaurant = require('../../models/restaurant')
const router = express.Router()

// go to new handlebars
router.get('/new', (req, res) => {
  return res.render('new')
})

// show restaurant by id
router.get('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.error(error))
})

// got to edit handlebars
router.get('/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => {
      console.log('id', restaurant._id)
      res.render('edit', { restaurant })
    })
    .catch(error => console.error(error))
})

// add a new restaurant
router.post('/', (req, res) => {
  return Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

// edit restaurant detail
router.put('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.error(error))
})

// delete restaurant
router.delete('/:restaurant_id/delete', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findByIdAndDelete(id)
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

module.exports = router
