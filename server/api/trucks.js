const router = require('express').Router()
const {Truck} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Truck.findAll({
    // explicitly select only the id and email fields - even though
    // trucks' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(trucks => res.json(trucks))
    .catch(next)
})
