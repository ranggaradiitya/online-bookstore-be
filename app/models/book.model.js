module.exports = (sequelize, Sequelize) => {
  const Book = sequelize.define('books', {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    image: {
      type: Sequelize.STRING,
    },
    availability: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  });

  return Book;
};
