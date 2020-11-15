const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.WT_SIGN_SECRET;

module.exports = {
  genToken: (userData) => {
    return jwt.sign(
      {
        userId: userData.id,
        userAdmin: userData.admin,
      },
      SECRET
    );
  },

  authenticateJWT: (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(' ')[1];

      jwt.verify(token, SECRET, (err, user) => {
        if (err) {
          console.log(err);
          return res.sendStatus(403);
        }

        req.user = user;

        next();
      });
    } else {
      res.status(401).json({
        error: 'Vous devez être connecté pour accéder à cette ressource',
      });
    }
  },

  isAdmin: (req, res, next) => {
    console.log('isAdmin', req.user);
    if (req.user.userAdmin === true) next();
    else {
      res.status(401).json({
        error: 'Vous devez être connecté pour accéder à cette ressource',
      });
    }
  },
};
