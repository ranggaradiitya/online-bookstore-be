const db = require('../models');
const Book = db.books;
const Review = db.reviews;

exports.addReview = async (req, res) => {
  try {
    const { bookId, reviewText } = req.body;
    const userId = req.userId; // Get userId from the authentication process

    // Make sure the bookId exists in the database
    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({
        status: 'error',
        message: 'Book not found',
      });
    }

    // Check if the user has already reviewed the book
    let existingReview = await Review.findOne({
      where: {
        bookId: bookId,
        userId: userId,
      },
    });

    if (existingReview) {
      // If a review already exists, update the reviewText
      await existingReview.update({ review_text: reviewText });
    } else {
      // If no review exists, add a new review
      existingReview = await Review.create({
        bookId: bookId,
        userId: userId,
        review_text: reviewText,
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Review added/updated successfully.',
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to add/update review.',
      data: err.message,
    });
  }
};
