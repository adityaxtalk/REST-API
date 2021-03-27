const Sequelize = require('sequelize')
const sequelize = require('../util/dbconfig');

const Product = sequelize.define('Product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.STRING,
        allowNull: false
    },
    imageURL: {
        type: Sequelize.STRING,
        allowNull: false

    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    }

})

module.exports = Product