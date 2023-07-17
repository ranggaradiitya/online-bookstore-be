const { authJwt, validations } = require('../middlewares');
const controller = require('../controllers/rating.controller');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'Authorization, Origin, Content-Type, Accept'
    );
    next();
  });

  const router = require('express').Router();

  // Rute untuk menambahkan order
  router.post(
    '/',
    [validations.addRatingValidation, authJwt.verifyToken],
    controller.addRating
  );

  app.use('/api/ratings', router);
};
