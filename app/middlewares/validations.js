const Joi = require('joi');

signupValidation = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    roles: Joi.array().items(Joi.string().valid('admin', 'user')),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }

  next();
};

signinValidation = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }

  next();
};

addBookValidation = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    price: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }

  next();
};

addToCartValidation = (req, res, next) => {
  const schema = Joi.object({
    bookId: Joi.number().required(),
    quantity: Joi.number().min(1).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }

  next();
};

addRatingValidation = (req, res, next) => {
  const schema = Joi.object({
    bookId: Joi.number().required(),
    ratingValue: Joi.number().min(1).max(5).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }

  next();
};

addReviewValidation = (req, res, next) => {
  const schema = Joi.object({
    bookId: Joi.number().required(),
    reviewText: Joi.string().min(3).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }

  next();
};

const validations = {
  signupValidation,
  signinValidation,
  addBookValidation,
  addToCartValidation,
  addRatingValidation,
  addReviewValidation,
};

module.exports = validations;
