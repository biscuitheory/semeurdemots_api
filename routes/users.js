const express = require('express');

const usersController = require('../controllers/users');
const jwtUtils = require('../utils/jwt.utils');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { firstname, email } = req.body;

  if (firstname === null || firstname === undefined || firstname === '') {
    return res.status(400).json({
      error: "Le champ firstname n'est pas renseigné",
    });
  }
  if (typeof firstname !== 'string') {
    return res.status(400).json({
      error: 'Le champ firstname doit être une chaîne de caractères',
    });
  }

  const userFound = await usersController.checkEmail(email);
  if (userFound === null) {
    const newUser = await usersController.addUser(req.body);

    res.status(201).json({
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      address: newUser.address,
      zipcode: newUser.zipcode,
      city: newUser.city,
      country: newUser.country,
      phone: newUser.phone,
      username: newUser.username,
      email: newUser.email,
      admin: newUser.admin,
    });
  } else {
    return res.status(409).json({
      error: 'Un utilisateur utilisant cette adresse email est déjà enregistré',
    });
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  const userFound = await usersController.getUserByEmail(email);

  if (userFound) {
    const isIdentified = await usersController.checkPassword(
      password,
      userFound.password
    );
    if (isIdentified) {
      res.status(200).json({
        token: jwtUtils.genToken(userFound),
        user: {
          firstname: userFound.firstname,
          lastname: userFound.lastname,
          address: userFound.address,
          zipcode: userFound.zipcode,
          city: userFound.city,
          country: userFound.country,
          phone: userFound.phone,
          username: userFound.username,
          email: userFound.email,
          admin: userFound.admin,
        },
      });
    } else {
      return res.status(401).json({
        message: "Votre mot de passe n'est pas correct",
      });
    }
  } else {
    return res.status(401).json({
      message: "Votre compte n'existe pas",
    });
  }
});

router.get('/signup', async (req, res) => {
  res.send('Signup formulaire');
});

router.get('/user', (req, res) => {
  res.send('Portail admin');
});

module.exports = router;
