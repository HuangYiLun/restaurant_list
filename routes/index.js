// 引用express 與 express 路由器
const express = require('express')
const user = require('../models/user')
const router = express.Router()
// 引用home 與 restaurants 模組程式碼
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')
const users = require('./modules/users')

// setting routes
router.use('/users', users)
router.use('/restaurants', restaurants)
router.use('/search', search)
router.use('/', home)

module.exports = router
