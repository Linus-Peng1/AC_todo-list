const Todo = require('../todo')
const db = require('../../config/mongoose')

// 執行完 mongoose.js 後，繼續執行後續動作
db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < 10; i++) {
    Todo.create({ name: 'name-' + i })
  }
})