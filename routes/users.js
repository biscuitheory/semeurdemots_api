const express = require('express');
require('dotenv').config();
const nodemailer = require('nodemailer');

const usersController = require('../controllers/users');
const jwtUtils = require('../utils/jwt.utils');

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

router.post('/signuplite', async (req, res) => {
  const { username, email } = req.body;

  if (username === null || username === undefined || username === '') {
    return res.status(400).json({
      error: "Le champ username n'est pas renseigné",
    });
  }
  if (typeof username !== 'string') {
    return res.status(400).json({
      error: 'Le champ username doit être une chaîne de caractères',
    });
  }

  const userFound = await usersController.checkEmail(email);
  if (userFound === null) {
    const newUser = await usersController.addUser(req.body);

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: `Bienvenue ${username}, la création de votre compte client est un succès !`,
      html: `Chèr(e) ${username}, votre compte client sur la boutique du semeur de mots a bien été crée ! Vous pouvez désormais vous connecter via la page http://localhost:3000/compte-client pour consulter l'historique de vos (futures) commandes ainsi que vos informations personnelles saisies sur le site. A très bientôt sur www.semeurdemots.fr !`,
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log(`Email sent: '${info.response}`);
      }
    });

    res.status(201).json({
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
  const { emailOrUsername, password } = req.body;
  if (
    emailOrUsername === null ||
    emailOrUsername === undefined ||
    emailOrUsername === ''
  ) {
    return res.status(400).json({
      error: "Le champ email or username n'est pas renseigné",
    });
  }
  if (typeof emailOrUsername !== 'string') {
    return res.status(400).json({
      error: 'Le champ email or username doit être une chaîne de caractères',
    });
  }

  const userFound = await usersController.getUserByEmailOrUsername(
    emailOrUsername
  );

  if (userFound) {
    console.log(userFound);
    // console.log(userFound.dataValues);
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