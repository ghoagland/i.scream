const User = require('./User');
const Truck = require('./Truck');
const Stop = require('./Stop');
const RouteStop = require('./RouteStop');


Stop.belongsTo(Truck);

RouteStop.belongsTo(Stop, {as: 'current'});
RouteStop.belongsTo(Stop, {as: 'next'});


module.exports = {
  User,
  Truck,
  Stop
}
