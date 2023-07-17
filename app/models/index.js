const config = require('../configs/db.config.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./user.model.js')(sequelize, Sequelize);
db.roles = require('../models/role.model.js')(sequelize, Sequelize);
db.books = require('./book.model.js')(sequelize, Sequelize);
db.carts = require('./cart.model.js')(sequelize, Sequelize);
db.orders = require('./order.model.js')(sequelize, Sequelize);
db.ratings = require('./rating.model.js')(sequelize, Sequelize);
db.reviews = require('./review.model.js')(sequelize, Sequelize);

// relation for users and roles
db.roles.belongsToMany(db.users, {
  through: 'user_roles',
});
db.users.belongsToMany(db.roles, {
  through: 'user_roles',
});
db.ROLES = ['user', 'admin'];

// relation for users and carts
db.users.hasOne(db.carts);
db.carts.belongsTo(db.users);

// relation for users and orders
db.users.hasMany(db.orders);
db.orders.belongsTo(db.users);

// relation for books and carts
const booksCarts = sequelize.define('books_carts', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
});
db.books.belongsToMany(db.carts, {
  through: booksCarts,
});
db.carts.belongsToMany(db.books, {
  through: booksCarts,
});

// relation for users and ratings
db.users.hasMany(db.ratings);
db.ratings.belongsTo(db.users);

// relation for books and ratings
db.books.hasMany(db.ratings);
db.ratings.belongsTo(db.books);

// relation for users and reviews
db.users.hasMany(db.reviews);
db.reviews.belongsTo(db.users);

// relation for books and reviews
db.books.hasMany(db.reviews);
db.reviews.belongsTo(db.books);

module.exports = db;
