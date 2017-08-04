const Sequelize = require('sequelize');
const db = require('../db');

const Stop = db.define('stop', {
  lat: {
    type: Sequelize.DECIMAL
  },
  lng: {
    type: Sequelize.DECIMAL
  },
  name: {
    type: Sequelize.STRING,
  }
})

module.exports = Stop;
