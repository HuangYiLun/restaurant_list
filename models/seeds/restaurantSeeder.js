const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const restaurantJson = require('../../restaurant.json')
const resturantData = restaurantJson.results

db.once('open', () => {
  for (let i = 0; i < resturantData.length; i++) {
    Restaurant.create({
      name: resturantData[i].name,
      name_en: resturantData[i].name_en,
      category: resturantData[i].category,
      image: resturantData[i].image,
      location: resturantData[i].location,
      phone: resturantData[i].phone,
      google_map: resturantData[i].google_map,
      rating: resturantData[i].rating,
      description: resturantData[i].description
    })
  }
  console.log('db done')
})
