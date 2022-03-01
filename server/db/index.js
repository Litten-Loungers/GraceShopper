//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Product = require('./models/Product')
const Cart = require('./models/Cart')

//associations could go here!


User.belongsToMany(Product, {through: Cart, as: 'Cart'})
Product.belongsToMany(User, {through: Cart, as: 'Cart'})

User.belongsToMany(Product, {through: 'PurchaseHistory', })
Product.belongsToMany(User, {through: 'PurchaseHistory', })


module.exports = {
  db,
  models: {
    User,
    Product,
    Cart
  },
}
