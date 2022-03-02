//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");
const LineItem = require("./models/LineItem");

//associations could go here!

// 1:M
User.hasMany(Order);
Order.belongsTo(User);

// 1:M
Order.hasMany(LineItem);
LineItem.belongsTo(Order);

// 1:M
Product.hasMany(LineItem);
LineItem.belongsTo(Product);

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    LineItem,
  },
};
