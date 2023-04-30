// require package used in the project
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const session = require('express-session')
const usePassport = require('./config/passport')

const routes = require('./routes')
require('./config/mongoose')

const app = express()
const port = process.env.PORT

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

// setting body-parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

usePassport(app)

app.use(routes)

// setting static files
app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})
