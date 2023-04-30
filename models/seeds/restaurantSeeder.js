const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const User = require('../user')
const restaurantJson = require('../../restaurant.json')
const resturantData = restaurantJson.results
const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const SEED_USERS = [
  {
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    email: 'user2@example.com',
    password: '12345678'
  },
]

db.once('open', () => {
  let count = 0
  for (let i = 0; i < SEED_USERS.length; i++) {
    console.log(`i${i}`)
    const { email, password } = SEED_USERS[i]
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => User.create({
        email,
        password: hash
      }))
      .then(user => {
        const userId = user._id
        return Promise.all(Array.from(
          [i * 3, i * 3 + 1, i * 3 + 2],
          j => Restaurant.create({
            name: resturantData[j].name,
            name_en: resturantData[j].name_en,
            category: resturantData[j].category,
            image: resturantData[j].image,
            location: resturantData[j].location,
            phone: resturantData[j].phone,
            google_map: resturantData[j].google_map,
            rating: resturantData[j].rating,
            description: resturantData[j].description,
            userId: userId
          })
        ))
      })
      .then(() => {
        count++
        console.log(`count${count}`)
        if (count === SEED_USERS.length) {
          console.log('done')
          process.exit()
        }
      })
  }
})
