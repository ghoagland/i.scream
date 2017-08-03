const Sequelize = require('sequelize');
const db = require('../db');

//join table with currentId and nextId from Stop model
const RouteStop = db.define('routeStop', {
  status: {
    type: Sequelize.ENUM('visited', 'active', 'next', 'planned', 'deactivated'),
    allowNull: false
  },
  leavingTime: {
    type: Sequelize.DATE,
    allowNull: false
  }

})

module.exports = RouteStop;
