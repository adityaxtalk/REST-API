const Product = require('../models/product');
const User = require('../models/user');


exports.getCart = async(req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.userData.userId } })
        const cart = await user.getCart()
        if (!cart) {
            cart = user.createCart()
        }
        const products = await cart.getProducts()

        if (products.length > 0) {
            res.status(200).json({ message: "Cart Fetched", product: products });
        } else {
            res.json({ message: "There is no item in cart" })
        }
    } catch (error) {
        res.status(500).json({ message: 'Fail to add product' })
    }





}

exports.addToCart = async(req, res) => {
    try {
        const productId = req.body.productId;
        let fetchedCart;
        let newQuantity = 1;
        const user = await User.findOne({ where: { id: req.userData.userId } })
        const cart = await user.getCart()
        if (!cart) {
            cart = user.createCart();
        }
        fetchedCart = cart;
        const products = await cart.getProducts({ where: { id: productId } });
        let product;
        if (products.length > 0) {
            product = products[0];
        }
        if (product) {
            const oldQuantity = product.cartItem.quantity;
            newQuantity = oldQuantity + 1;

        } else {
            product = await Product.findByPk(productId);
        }

        const result = await fetchedCart.addProduct(product, { through: { quantity: newQuantity } })
        if (result) {
            res.status(200).json({ message: "Item added to cart" });
        } else {
            res.json("Unable to add item in cart");
        }

    } catch (error) {
        res.status(500).json('Error occurred while handling the request.');
    }
}



exports.deleteCart = async(req, res) => {
    try {
        const productId = req.body.productId;
        const user = await User.findOne({ where: { id: req.userData.userId } })
        const cart = await user.getCart();
        const products = await cart.getProducts({ where: { id: productId } });
        const result = await products[0].cartItem.destroy();
        if (result) {
            res.status(200).json('Cart Item is deleted')
        } else {
            res.json('Unable to delete cart item')
        }
    } catch (error) {
        res.status(500).json('Error occurred while handling the request.')
    }

}