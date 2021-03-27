const e = require('express');
const User = require('../models/user')

exports.addOrder = async(req, res) => {
    try {
        User.findOne({ where: { id: req.userData.userId } })
        const cart = await user.getCart();
        const products = await cart.getProducts();
        const order = await user.createOrder();
        const result = await order.addProducts(
            products.map(product => {
                product.orderItem = { quantity: product.cartItem.quantity };
                return product;
            }));
        if (result) {
            await cart.setProducts(null);
            res.status(200).json('Your order is placed.');
        }
    } catch (error) {
        res.status(500).json('Error occurred while handling the request.')
    }

}

exports.getOrder = async(req, res) => {


    User.findOne({ where: { id: req.userData.userId } }).then(user => {
        user.getOrders({ include: ['Products'] })
            .then(orders => {
                if (orders) {
                    res.status(200).json({ status: 'Success', Orders: orders })
                } else {
                    res.json('There is no order placed');
                }
            })

    }).catch(err => {
        res.status(500).json('Error occurred while handling the request.');
    })
}