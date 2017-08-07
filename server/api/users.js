const router = require('express').Router()
const { User } = require('../db/models')
module.exports = router

router.get('/:userId', (req, res, next) => {
  console.log(req.params)
  User.findById(+req.params.userId)
    .then(user => {
      if (user.type === 'truck') res.json(user);
      else res.sendStatus(401);
    })
    .catch(next)
})

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})


router.put('/', (req, res, next) => {
  User.findById(+req.body.user.id)
    .then(user => user.update(req.body.user))
    .then(updatedUser => res.json(updatedUser))
    .catch(next)
})

router.delete('/', (req, res, next) => {
  User.findById(req.body.user.id)
    .then(user => user.delete())
    .then(deletedUser=> res.json(deletedUser))
    .catch(next)
})
