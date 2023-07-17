module.exports = (sequelize, Sequelize) => {
  const Rating = sequelize.define('reviews', {
    review_text: {
      type: Sequelize.TEXT,
    },
  });

  return Rating;
};
