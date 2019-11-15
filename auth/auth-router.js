const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('./auth-model');

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  let hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;

  Users.add(user)
    .then(id => {
      res.status(201).json(id);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  // implement login
  
});

module.exports = router;
