var express = require('express')
var router = express.Router()
var controller = require('../app/Http/Controller/controllers')
const middleware = require('../app/Http/Middleware/middleware')

router.route('/store', middleware.jwtVerify)
    .get(controller.GoodsController.index)

module.exports = router