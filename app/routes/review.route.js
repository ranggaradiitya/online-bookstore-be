const { authJwt, validations } = require('../middlewares');
const controller = require('../controllers/review.controller');

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
    [validations.addReviewValidation, authJwt.verifyToken],
    controller.addReview
  );

  app.use('/api/reviews', router);
};
