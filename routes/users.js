require('dotenv').config()

var express = require('express');
var router = express.Router();
const controller = require('../app/Http/Controller/controllers')
const middleware = require('../app/Http/Middleware/middleware')

/* GET users listing. */
router.post('/register', controller.UserController.register);
router.post('/login', controller.UserController.login);
router.get('/profile' , middleware.jwtVerify, controller.UserController.profile)
router.put('/profile', middleware.jwtVerify, controller.UserController.update)

module.exports = router;
