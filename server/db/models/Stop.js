const Sequelize = require('sequelize');
const db = require('../db');

const Stop = db.define('stop', {
  lat: {
    type: Sequelize.DECIMAL(9, 5)
  },
  lng: {
    type: Sequelize.DECIMAL(9, 5)
  },
  name: {
    type: Sequelize.STRING,
  }
})

module.exports = Stop;
