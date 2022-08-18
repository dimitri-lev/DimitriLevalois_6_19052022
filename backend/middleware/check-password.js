const passwordSchema = require('../models/password');

module.exports = (req, res, next) => {
  if (!passwordSchema.validate(req.body.password)) {
    res.status(400).json({
      message:
        'Le mdp doit faire au moins 10 caractère avec une majuscule et un chiffre',
    });
  } else {
    next();
  }
};
