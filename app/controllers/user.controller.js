exports.allAccess = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Public Content.',
  });
};

exports.userBoard = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'User Content.',
  });
};
