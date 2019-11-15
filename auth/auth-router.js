const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('./auth-model');

const { validateUser } = require('./authenticate-middleware');

router.post('/register', validateUser, (req, res) => {
  // implement registration
  let user = req.body;
  let hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;

  Users.add(user)
    .then(id => {
      res.status(201).json(id);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;

  Users.findByUser(username)
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = getJwtToken(user.id);

        res.status(200).json({
          message: `Hi, username. I'm Dad.`,
          token
        });
      } else {
        res.status(401).json({ message: 'Get off my lawn!' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(error);
    });  
});



getJwtToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '10m' });


module.exports = router;
