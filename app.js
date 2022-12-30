// require package used in the project
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const Restaurant = require('./models/restaurant')
const restaurant = require('./models/restaurant')
const app = express()
const port = 3000

// use dotenv when env is not production
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting body-parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// setting connection to mongoDB
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URI)

// acquire db connection
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
})

// setting static files
app.use(express.static("public"))

// setting routes
// get all restaurants
app.get('/', (req, res) => {
  return Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

// go to new handlebars
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

// show restaurant by id
app.get('/restaurants/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.error(error))
})

// got to edit handlebars
app.get('/restaurants/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => {
      console.log('id', restaurant._id)
      res.render('edit', { restaurant })
    })
    .catch(error => console.error(error))
})

// search restuarnats
app.get('/search', (req, res) => {
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

// add a new restaurant
app.post('/restaurants', (req, res) => {
  console.log('new', req.body)
  return Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

// edit restaurant detail
app.put('/restaurants/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id

  return Restaurant.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.error(error))
})

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})
