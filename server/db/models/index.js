const User = require('./User');
const Truck = require ('./Truck');
const Stop = require ('./Stop');

Stop.belongsTo(Truck);

module.exports = {
  User,
  Truck,
  Stop
}
