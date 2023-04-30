// 引用express 與 express 路由器
const express = require('express')
const user = require('../models/user')
const router = express.Router()
// 引用home 與 restaurants 模組程式碼
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')
const users = require('./modules/users')
const auth = require('./modules/auth')

const { authenticator } = require('../middleware/auth')

// setting routes
router.use('/auth', auth)
router.use('/users', users)
router.use('/restaurants', authenticator, restaurants)
router.use('/search', authenticator, search)
router.use('/', authenticator, home)

module.exports = router
