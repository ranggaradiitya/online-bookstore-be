const db = require('../models');
const Book = db.books;
const Cart = db.carts;
const fs = require('fs');
const path = require('path');
const Op = db.Sequelize.Op;

// Add a book
exports.addBook = (req, res) => {
  const { title, author, price } = req.body;
  const image = req.file ? req.file.filename : null;

  // Create a new book record
  Book.create({ title, author, price, image })
    .then((book) => {
      res.status(201).json({
        status: 'success',
        message: 'Book added successfully.',
        data: book,
      });
    })
    .catch((err) => {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      res.status(500).json({
        status: 'error',
        message: 'Failed to add book.',
        data: err.message,
      });
    });
};

// Controller untuk menampilkan gambar buku berdasarkan filename
exports.getBookImage = (req, res) => {
  const fileName = req.params.fileName;
  const imagePath = path.join(__dirname, '../../public/images/books', fileName);

  // Menggunakan express.static untuk memberikan akses ke direktori gambar
  res.sendFile(imagePath);
};

exports.getBooks = async (req, res) => {
  const perPage = 20;
  const page = req.query.page || 1;
  const offset = (page - 1) * perPage;
  const keywords = req.query.keywords || '';

  try {
    const { count, rows } = await Book.findAndCountAll({
      where: {
        [Op.or]: {
          title: { [Op.like]: `%${keywords}%` },
          author: { [Op.like]: `%${keywords}%` },
        },
      },
      limit: perPage,
      offset,
    });

    if (count === 0) {
      // Jika data buku tidak ditemukan
      return res.status(404).json({
        status: 'error',
        message: 'No books found for the given search.',
        data: [],
        total: 0,
      });
    }

    // Tambahkan URL gambar ke data buku
    const booksWithImageURL = rows.map((book) => ({
      ...book.toJSON(),
      imageURL: `http://localhost:8080/api/books/images/${book.image}`,
    }));

    res.status(200).json({
      status: 'success',
      data: booksWithImageURL,
      total: count,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to get books.',
      data: err.message,
    });
  }
};

exports.getBookDetails = async (req, res) => {
  const bookId = req.params.bookId;

  try {
    const book = await Book.findOne({
      where: { id: bookId },
    });

    if (!book) {
      return res.status(404).json({
        status: 'error',
        message: 'Book not found.',
      });
    }

    // Tambahkan URL gambar ke data buku
    const bookWithImageURL = {
      ...book.toJSON(),
      imageURL: `http://localhost:8080/api/books/images/${book.image}`,
    };

    res.status(200).json({
      status: 'success',
      data: bookWithImageURL,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to get book detail.',
      data: err.message,
    });
  }
};
