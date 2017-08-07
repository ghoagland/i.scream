const router = require('express').Router()
const {TruckInfo, User, RouteStop } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    where: {type: 'truck'},
    include: [RouteStop]
  })
    .then(trucks => res.json(trucks))
    .catch(next)
})
