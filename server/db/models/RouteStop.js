const Sequelize = require('sequelize');
const db = require('../db');

//join table with currentId and nextId from Stop model
const RouteStop = db.define('routeStop', {
  status: {
    type: Sequelize.ENUM('left', 'active', 'next', 'planned', 'deactivated'),
    allowNull: false
  },
  departureTime: {
    type: Sequelize.DATE,
    allowNull: false
  }
})

module.exports = RouteStop;
