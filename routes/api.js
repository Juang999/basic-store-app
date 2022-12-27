var express = require('express')
var router = express.Router()
var controller = require('../app/Http/Controller/controllers')

router.get('/user', controller.UserController.index)
router.post('/register', controller.UserController.register)

module.exports = router