const { verifySignUp, validations } = require('../middlewares');
const controller = require('../controllers/auth.controller');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'Authorization, Origin, Content-Type, Accept'
    );
    next();
  });

  const router = require('express').Router();

  router.post(
    '/signup',
    [
      validations.signupValidation,
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signup
  );

  router.post('/signin', [validations.signinValidation], controller.signin);

  app.use('/api/auth', router);
};
