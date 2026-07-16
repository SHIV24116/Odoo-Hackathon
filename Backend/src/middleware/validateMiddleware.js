const validate = (validator) => (req, res, next) => {
  try {
    req.body = validator(req.body || {});
    next();
  } catch (error) {
    res.status(422).json({ success: false, message: error.message });
  }
};

module.exports = validate;
