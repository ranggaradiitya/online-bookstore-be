const jwt = require('jsonwebtoken');
const config = require('../configs/auth.config.js');
const db = require('../models');
const User = db.users;

verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(403).json({
      status: 'error',
      message: 'No token provided!',
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: 'error',
        message: 'Unauthorized!',
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'admin') {
          next();
          return;
        }
      }
      res.status(403).json({
        status: 'error',
        message: 'Require Admin Role!',
      });
      return;
    });
  });
};

const authJwt = { verifyToken, isAdmin };
module.exports = authJwt;
