const Router = require('express').Router()
const cartController = require('../controllers/cartController');
const checkAuth = require('../middleware/is-auth')

Router.get('/', checkAuth, cartController.getCart);

Router.post('/addToCart', checkAuth, cartController.addToCart);

Router.delete('/', checkAuth, cartController.deleteCart);
module.exports = Router