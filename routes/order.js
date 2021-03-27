const Router = require('express').Router()
const orderController = require('../controllers/orderController')
const checkAuth = require('../middleware/is-auth')

Router.post('/addOrder', checkAuth, orderController.addOrder);

Router.get('/', checkAuth, orderController.getOrder);


module.exports = Router