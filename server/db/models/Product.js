const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: Sequelize.STRING, // Shouldn't price be a decimal number?
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  imageURL: {
    type: Sequelize.STRING, // String might not be long enough to hold all image URLs
    defaultValue: 'https://pbs.twimg.com/media/E2AIHRRXMAgyW4b.jpg',
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  available: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});


module.exports = Product