const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');


const app = express();

require('dotenv').config();

const sequelize = require('./util/dbconfig')
const api_routes = require('./routes/api_routes')


app.use(express.urlencoded({ extended: false }))
app.use(express.json());



app.use(process.env.API_BASE_URL, api_routes)


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });



sequelize.sync()

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500);
    res.send("Error occur while handling request");
});


module.exports = app;