const { authJwt } = require('../middlewares');
const controller = require('../controllers/order.controller');

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
  router.post('/', authJwt.verifyToken, controller.addOrder);

  app.use('/api/orders', router);
};
