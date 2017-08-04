const User = require('./User');
const Truck = require('./Truck');
const Stop = require('./Stop');
const RouteStop = require('./RouteStop');
const Route = require('./Route');


Stop.belongsTo(Truck);

RouteStop.belongsTo(Stop, {as: 'current'});
RouteStop.belongsTo(Stop, {as: 'next'});

Truck.belongsToMany(RouteStop, { through: 'route' })
RouteStop.belongsToMany(Truck, { through: 'route' })


module.exports = {
  User,
  Truck,
  Stop,
  RouteStop
}
