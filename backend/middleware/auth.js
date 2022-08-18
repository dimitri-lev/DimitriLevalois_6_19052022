const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // on récupère le token dans le header
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN); // on lui passe en argument le token récupéré et la clé secrète
    const userId = decodedToken.userId; // on récupère notre userId puis on vérifier sa validité
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!'),
    });
  }
};
