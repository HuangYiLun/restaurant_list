// require package used in the project
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Todo = require('./models/todo')
const app = express()
const port = 3000

// use dotenv when env is not production
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

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
app.get('/', (req, res) => {
  Todo.find()
      .lean()
      .then(todos => res.render('index', { todos }))
      .catch(error => console.error(error))
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  const restaurant = restaurantList.results.find(
    restaurant => restaurant.id.toString() === id)
  res.render('show', { restaurant })
})

app.get('/search', (req, res) => {
  // const keyword = req.query.keyword
  // const restaurants = restaurantList.results.filter(
  //   restaurant =>
  //     restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase()))
  // res.render('index', { restaurants, keyword })
})


app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})