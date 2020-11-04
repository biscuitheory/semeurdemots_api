const express = require('express');
require('dotenv').config();
const nodemailer = require('nodemailer');

const usersController = require('../controllers/users');
const { authenticateJWT } = require('../utils/jwt.utils');
const jwtUtils = require('../utils/jwt.utils');

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

router.post('/signup', async (req, res) => {
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

router.post('/signincustomer', async (req, res) => {
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
    // console.log(userFound);
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

router.post('/signinadmin', async (req, res) => {
  const { emailOrUsername, password, userAdmin } = req.body;
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

  if (userAdmin === false) {
    return res.status(403).json({
      message: "Vous n'êtes pas autorisé à accéder à cette ressource",
    });
  }

  const userFound = await usersController.getUserByEmailOrUsername(
    emailOrUsername
  );

  if (userFound) {
    // console.log(userFound);
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

router.get('/user/me', authenticateJWT, async (req, res) => {
  // console.log('from user route', req.user);
  const identifiedUser = await usersController.getIdentifiedUser(
    req.user.userId
  );

  res.status(200).json(identifiedUser);
});

router.post('/signupfull', async (req, res) => {
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

router.get('/users', async (req, res) => {
  const usersFound = await usersController.getAllUsers();
  return res.status(200).json(usersFound);
});

router.get('/users/:id', async (req, res) => {
  const userFound = await usersController.getUserById(req.params);
  if (!userFound) {
    return res.status(404).json({
      error: "La ressource demandée n'existe pas",
    });
  }
  return res.status(200).json({
    id: userFound.id,
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
  });
});

router.patch('/users/', authenticateJWT, async (req, res) => {
  const { userId } = req.user;

  // if (username === null || username === undefined || username === '') {
  //   return res.status(400).json({
  //     error: "Le champ username n'est pas renseigné",
  //   });
  // }
  // if (typeof username !== 'string') {
  //   return res.status(400).json({
  //     error: 'Le champ username doit être une chaîne de caractères',
  //   });
  // }

  // console.log(req.body);
  const userUpdated = await usersController.updateUser(req.body, userId);

  if (!userUpdated) {
    return res.status(404).json({
      message: "L'utilisateur demandé n'existe pas",
    });
  }

  return res.status(200).json({
    firstname: userUpdated.firstname,
    lastname: userUpdated.lastname,
    address: userUpdated.address,
    zipcode: userUpdated.zipcode,
    city: userUpdated.city,
    country: userUpdated.country,
    phone: userUpdated.phone,
    username: userUpdated.username,
    email: userUpdated.email,
    admin: userUpdated.admin,
  });
});

router.delete('/users/:id', async (req, res) => {
  const removedUser = await usersController.deleteUser(req.params);

  if (!removedUser) {
    return res.status(404).json({
      message: "La ressource demandée n'existe pas",
    });
  }

  return res.status(200).json({
    message: "L'utilisateur a été supprimé",
  });
});

router.get('/signup', async (req, res) => {
  res.send('Signup formulaire');
});

module.exports = router;
