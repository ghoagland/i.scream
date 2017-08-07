const User = require('./User');
const TruckInfo = require('./TruckInfo');
const Stop = require('./Stop');
const RouteStop = require('./RouteStop');
const Route = require('./Route');


Stop.belongsTo(User);

RouteStop.belongsTo(Stop, {as: 'current'});
RouteStop.belongsTo(Stop, {as: 'next'});

User.belongsToMany(RouteStop, { through: 'route' })
RouteStop.belongsToMany(User, { through: 'route' })

TruckInfo.belongsTo(User);
User.hasOne(TruckInfo);


module.exports = {
  User,
  TruckInfo,
  Stop,
  RouteStop,
  Route
}
