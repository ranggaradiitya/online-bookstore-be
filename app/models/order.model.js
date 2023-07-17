module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define('orders', {
    total_amount: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });

  return Order;
};
