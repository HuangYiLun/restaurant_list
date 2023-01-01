// 引用express 與 express 路由器
const express = require('express')
const router = express.Router()
// 引用home 與 restaurants 模組程式碼
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')

// setting routes
router.use('/', home)
router.use('/restaurants', restaurants)
router.use('/search', search)

module.exports = router
