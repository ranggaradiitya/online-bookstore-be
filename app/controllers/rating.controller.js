const db = require('../models');
const Book = db.books;
const Rating = db.ratings;

exports.addRating = async (req, res) => {
  try {
    const { bookId, ratingValue } = req.body;
    const userId = req.userId; // Mendapatkan userId dari proses autentikasi

    // Pastikan bookId ada di database (tersedia)
    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({
        status: 'error',
        message: 'Book not found',
      });
    }

    // Cek apakah pengguna sudah memberikan rating pada buku ini sebelumnya
    const existingRating = await Rating.findOne({
      where: {
        bookId: bookId,
        userId: userId,
      },
    });

    if (existingRating) {
      // Jika sudah ada, update rating yang sudah ada
      await existingRating.update({ rating: ratingValue });
    } else {
      // Jika belum ada, tambahkan rating baru
      await Rating.create({
        bookId: bookId,
        userId: userId,
        rating: ratingValue,
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Rating added successfully.',
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to add rating.',
      data: err.message,
    });
  }
};
