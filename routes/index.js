const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const todos = require('./modules/todos')

// 定義首頁路由
router.use('/', home)
router.use('/todos', todos)

module.exports = router