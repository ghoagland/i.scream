const Promise = require('bluebird');
const db = require('./server/db');
const models = require('./server/db/models');
const User = models.User;
const Truck = models.Truck;


const users = [
  {
    name: 'Bob Waffle',
    email: 'bwaffle@waffle.com',
    password: 'bobspw',
    salt: 'sosalty',
    googleId: '1234',

  },
  {
    name: 'Sally Pancake',
    email: 'spancake@pancake.com',
    password: 'sallyspw',
    salt: 'saltyyyy',
    googleId: '5678',
    type: 'truck',
    lat: 40.708096,
    lng: -74.009880
  },
  {
    name: 'Pierre Croissant',
    email: 'pcroissant@croissant.com',
    password: 'pierrespw',
    salt: 'saltttt',
    googleId: '91011',
    type: 'truck',
    lat: 40.706348,
    lng: -74.012336
  },
  {
    name: 'Terri Toast',
    email: 'ttoast@toast.com',
    password: 'terrispw',
    salt: 'ilikesalt',
    googleId: '1213',
    type: 'truck',
    lat: 40.773486,
    lng: -73.945849
  },
  {
    name: 'Abner Crumpet',
    email: 'acrumpet@crumpet.com',
    password: 'abnerspw',
    salt: 'saltsalt',
    googleId: '1415',
    type: 'truck',
    lat: 40.779309,
    lng: -73.955347
  },
  {
    name: 'Minnie Muffin',
    email: 'mmuffin@muffin.com',
    password: 'minniespw',
    salt: 'salt123',
    googleId: '1617',
    type: 'truck',
    lat: 40.771358,
    lng: -73.950483
  },
  {
    name: 'Derek Doughnut',
    email: 'ddoughnut@doughnut.com',
    password: 'derekspw',
    salt: 'salt456',
    googleId: '1819'
  },
  {
    name: 'Betty Scone',
    email: 'bscone@scone.com',
    password: 'bettyspw',
    salt: 'salt789',
    googleId: '2021'
  },
  {
    name: 'Jake Cappuccino',
    email: 'jcappuccino@cappucino.com',
    password: 'jakespw',
    salt: 'saltisthebest',
    googleId: '2223'
  },
  {
    name: 'Earl Grey',
    email: 'egrey@tea.com',
    password: 'earlspw',
    salt: 'nosaltintea',
    googleId: '2425'
  },
  {
    name: 'Olivia Omelette',
    email: 'oomelette@omelette.com',
    password: 'oliviaspw',
    salt: 'saltisgood',
    googleId: '2627'
  }
];




db.sync({ force: true })
.then(() => Promise.all(users.map(user => User.create(user))))
.then(() => console.log('Finished seeding!'))
.catch(err => console.error('There was a problem seeding.', err, err.stack));
