const router = require('express').Router()
const {TruckInfo, User} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    where: {type: 'truck'},
    attributes: ['id', 'email']
  })
    .then(trucks => res.json(trucks))
    .catch(next)
})
