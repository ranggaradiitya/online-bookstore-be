const db = require('../models');
const User = db.users;
const Book = db.books;
const Cart = db.carts;

exports.addToCart = async (req, res) => {
  const { bookId, quantity } = req.body;
  const userId = req.userId; // Menggunakan userId dari proses autentikasi

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }

    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({
        status: 'error',
        message: 'Book not found',
      });
    }

    // Cek apakah user sudah memiliki cart
    let cart = await Cart.findOne({
      where: {
        UserId: userId,
      },
    });

    if (!cart) {
      // Jika belum, buat cart baru untuk user
      cart = await Cart.create();
      await cart.setUser(user);
    }

    // Tambahkan buku ke dalam cart
    await cart.addBook(book, { through: { quantity } });

    return res.status(201).json({
      status: 'success',
      message: 'Book added to cart successfully',
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};

exports.getAllBooksInCart = async (req, res) => {
  const userId = req.userId; // Menggunakan userId dari proses autentikasi

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }

    // Cari cart milik user
    const cart = await Cart.findOne({
      where: {
        UserId: userId,
      },
    });

    if (!cart) {
      return res.status(404).json({
        status: 'error',
        message: 'Cart not found',
      });
    }

    // Ambil semua buku dalam cart
    const booksInCart = await cart.getBooks();

    return res.status(200).json({
      status: 'success',
      data: booksInCart,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};
