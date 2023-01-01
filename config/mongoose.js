const mongoose = require('mongoose')

// use dotenv when env is not production
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

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

module.exports = db
