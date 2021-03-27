const router = require('express').Router();

const userRouter = require('./users');
const productRouter = require('./product');
const cartRouter = require('./cart')
const orderRouter = require('./order');


router.use('/users', userRouter);

router.use('/products', productRouter);

router.use('/carts', cartRouter);


router.use('/orders', orderRouter);

module.exports = router;