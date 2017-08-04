const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const TruckInfo = db.define('truckInfo', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING
  },
  salt: {
    type: Sequelize.STRING
  },
  googleId: {
    type: Sequelize.STRING
  },
  departureTime: {
    type: Sequelize.DATE,
  },
  lat: {
    type: Sequelize.DECIMAL(10, 5)
  },
  lng: {
    type: Sequelize.DECIMAL(10, 5)
  }
})

module.exports = TruckInfo
