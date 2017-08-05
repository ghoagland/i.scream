const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const TruckInfo = db.define('truckInfo', {
  departureTime: {
    type: Sequelize.DATE,
  }
})

module.exports = TruckInfo
