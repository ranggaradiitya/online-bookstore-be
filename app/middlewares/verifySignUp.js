const db = require('../models');
const ROLES = db.ROLES;
const User = db.users;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((user) => {
    if (user) {
      return res.status(400).json({
        status: 'error',
        message: 'Failed! Username is already in use!',
      });
    }

    // Email
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (user) {
        return res.status(400).json({
          status: 'error',
          message: 'Failed! Email is already in use!',
        });
      }

      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).json({
          status: 'error',
          message: 'Failed! Role does not exist = ' + req.body.roles[i],
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = { checkDuplicateUsernameOrEmail, checkRolesExisted };

module.exports = verifySignUp;
