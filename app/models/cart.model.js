module.exports = (sequelize, Sequelize) => {
  const Cart = sequelize.define('carts', {});

  return Cart;
};
