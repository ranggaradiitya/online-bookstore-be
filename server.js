const express = require('express');
const cors = require('cors');
const db = require('./app/models');
const path = require('path');

const app = express();

const corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// Menggunakan middleware express.static untuk memberikan akses ke folder gambar
app.use('/images', express.static(path.join(__dirname, 'public/images')));

db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//   console.log('Drop and re-sync db.');
// });

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to online bookstore API.' });
});

// routes
require('./app/routes/auth.route')(app);
require('./app/routes/user.route')(app);
require('./app/routes/book.route')(app);
require('./app/routes/cart.route')(app);
require('./app/routes/order.route')(app);
require('./app/routes/rating.route')(app);
require('./app/routes/review.route')(app);

// Middleware untuk menangani rute yang tidak terdaftar
app.use((req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found',
  });
});

// Middleware untuk menangani error lainnya
app.use((err, req, res, next) => {
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
