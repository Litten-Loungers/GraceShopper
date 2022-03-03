const Sequelize = require('sequelize');
const db = require('../db');

const LineItem = db.define('lineItem', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  price: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
  },
});

module.exports = LineItem;
