const Sequelize = require("sequelize");
const db = require("../db");

const Cart = db.define("cart", {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  }
});


module.exports = Cart