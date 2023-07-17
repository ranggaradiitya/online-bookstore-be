const db = require('../models');
const Order = db.orders;
const Cart = db.carts;
const Book = db.books;

exports.addOrder = async (req, res) => {
  try {
    const userId = req.userId; // Mendapatkan userId dari proses autentikasi
    const cart = await Cart.findOne({
      where: { userId },
      include: [
        {
          model: Book,
          attributes: [
            'id',
            'title',
            'author',
            'price',
            'image',
            'availability',
          ],
          through: { attributes: ['quantity'] }, // Mengambil jumlah buku dari tabel cart_books (junction table)
        },
      ],
    });

    if (!cart) {
      return res.status(404).json({
        status: 'error',
        message: 'Cart not found',
      });
    }

    // Hitung total harga order berdasarkan jumlah buku yang ada di cart
    let totalAmount = 0;
    cart.books.forEach((book) => {
      totalAmount += book.price * book.books_carts.quantity;
    });

    // Simpan order ke database
    const order = await Order.create({ total_amount: totalAmount, userId });

    // Sementara, anggap order berhasil disimpan dan hapus cart dari database
    await cart.destroy();

    res.status(200).json({
      status: 'success',
      message: 'Order placed successfully.',
      order: {
        id: order.id,
        total_amount: order.total_amount,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        books: cart.books,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to add order.',
      data: err.message,
    });
  }
};
