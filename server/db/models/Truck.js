const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Truck = db.define('truck', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  salt: {
    type: Sequelize.STRING
  },
  googleId: {
    type: Sequelize.STRING
  },
  lat: {
    type: Sequelize.DECIMAL(10, 5)
  },
  lng: {
    type: Sequelize.DECIMAL(10, 5)
  }

})

module.exports = Truck

/**
 * instanceMethods
 */
Truck.prototype.correctPassword = function (candidatePwd) {
  return Truck.encryptPassword(candidatePwd, this.salt) === this.password
}

/**
 * classMethods
 */
Truck.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64')
}

Truck.encryptPassword = function (plainText, salt) {
  return crypto.createHash('sha1').update(plainText).update(salt).digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = truck => {
  if (truck.changed('password')) {
    truck.salt = Truck.generateSalt()
    truck.password = Truck.encryptPassword(truck.password, truck.salt)
  }
}

Truck.beforeCreate(setSaltAndPassword)
Truck.beforeUpdate(setSaltAndPassword)
