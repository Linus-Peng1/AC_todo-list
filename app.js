const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const routes = require('./routes/index') // 引用路由器
require('./config/mongoose')

const app = express()

// 樣板引擎指定為 Handlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// 將 request 導入路由器
app.use(routes)

// 如果在 Heroku 環境則使用 process.env.PORT
// 否則為本地環境，使用 3000 
const PORT = process.env.PORT || 3000

// 設定應用程式監聽的埠號
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})