const { validations, authJwt } = require('../middlewares');
const controller = require('../controllers/cart.controller');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'Authorization, Origin, Content-Type, Accept'
    );
    next();
  });

  const router = require('express').Router();

  // Route untuk menambahkan buku ke cart
  router.post(
    '/',
    [validations.addToCartValidation, authJwt.verifyToken],
    controller.addToCart
  );

  router.get('/', authJwt.verifyToken, controller.getAllBooksInCart);

  app.use('/api/carts', router);
};
