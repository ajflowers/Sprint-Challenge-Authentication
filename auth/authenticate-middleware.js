/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken');

module.exports = {
  authenticate,
  validateUser
};

function authenticate(req, res, next) {
  const token = req.headers.authorization;
  if(token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if(err) {
        res.status(401).json({ message: `Keep your hands off that dial!` });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ you: 'shall not pass!' });
  }

};

function validateUser (req, res, next) {
  let { username, password } = req.body;
  let errors = [];

  if(!username || username.length < 3) {
    errors.push('Please include a username with at least 3 characters.')
  }

  if(!password || password.length < 8) {
    errors.push('Please include a password with at least 8 characters.')
  }

  // console.log('validation errors', errors, errors.length)

  if (errors.length > 0) {
    res.status(400).json({
      message: 'Invalid user info',
      errors
    });
  } else {
    next();
  }

  
}