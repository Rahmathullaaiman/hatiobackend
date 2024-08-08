const express = require('express')


const usercontroller = require('../CONTROLLERS/usercontroll')
const Todocontroller = require('../CONTROLLERS/Todocontroll')


const jwtmiddleware = require('../MIDDLEWARES/Jwtconfig')

//import multer
//const multerconfig = require('../Middleware/multermiddleware')

const router = new express.Router()


//register
router.post('/user/register',usercontroller.register)
//login
router.post('/user/login',usercontroller.login)
//add Text
router.post('/addText',jwtmiddleware,Todocontroller.AddText)
//delete todo
router.delete('/delete/:id',jwtmiddleware,Todocontroller.DeleteTodo)
//update todo
router.put('/update/:id',jwtmiddleware,Todocontroller.UpdateTodo)
//Get todos
router.get('/get',jwtmiddleware,Todocontroller.GetTodos)
//update status
router.put('/todos/:id',jwtmiddleware,Todocontroller.updateTodoStatus);

























module.exports = router
