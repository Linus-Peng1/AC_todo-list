// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Todo model
const Todo = require('../../models/todo')

// 定義路由
router.get('/new', (req, res) => {
  res.render('new')
})

// 新增 todo
router.post('/', (req, res) => {
  // 補充功能: 一次加入多個素
  const todos = (req.body.name).split(',').map(todo => ({ name: todo }))
  return Todo.insertMany(todos) 
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
  
  // const name = req.body.name
  // // 作法一: 直接操作 Todo
  // return Todo.create({ name }) // ({ name: name}) 縮寫
  //   .then(() => res.redirect('/'))
  //   .catch(error => console.log(error))

  // 作法二: 先產生物件實例，再把實例存入 Todo
  // return Todo.create({name})
  //   .then(() => res.redirect('/'))
  //   .catch(error => console.log(error))
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  // const name = req.body.name
  // const isDone = req.body.isDone
  const { name, isDone } = req.body // 合併上面 2 行程式碼
  return Todo.findById(id)
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect(`/`))
    .catch(error => console.log(error))
})
// 匯出路由模組
module.exports = router
