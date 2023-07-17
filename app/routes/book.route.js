const { validations, authJwt, upload } = require('../middlewares');
const controller = require('../controllers/book.controller');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'Authorization, Origin, Content-Type, Accept'
    );
    next();
  });

  const router = require('express').Router();

  // Menambah buku
  router.post(
    '/',
    [
      upload.single('image'),
      validations.addBookValidation,
      authJwt.verifyToken,
      authJwt.isAdmin,
    ],
    controller.addBook
  );

  // Rute untuk menampilkan gambar buku
  router.get('/images/:fileName', controller.getBookImage);

  // Rute untuk mendapatkan data buku dengan pagination dan pencarian
  router.get('/', controller.getBooks);

  // Menampilkan informasi buku detail
  router.get('/:bookId', controller.getBookDetails);

  app.use('/api/books', router);
};
