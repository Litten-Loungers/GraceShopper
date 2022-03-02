//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");
const LineItem = require("./models/LineItem");

//associations could go here!

User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(LineItem);
LineItem.belongsTo(Order);

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
