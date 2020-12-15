const express = require('express');
require('dotenv').config();
const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);

const productsController = require('../controllers/products');
const authMid = require('../utils/jwt.utils');

const router = express.Router();

router.get('/products', async (req, res) => {
  const productsFound = await productsController.getProducts();
  res.status(201).json(productsFound);
});

router.post(
  '/products',
  authMid.authenticateJWT,
  authMid.isAdmin,
  async (req, res) => {
    const { name, price, stock, description, image } = req.body;

    if (name === null || name === undefined || name === '') {
      return res.status(400).json({
        error: "Le champ nom du produit n'est pas renseigné",
      });
    }
    if (typeof name !== 'string') {
      return res.status(400).json({
        error: 'Le champ nom du produit doit être une chaîne de caractères',
      });
    }

    if (price === null || price === undefined || price === '') {
      return res.status(400).json({
        error: "Le champ prix du produit n'est pas renseigné",
      });
    }
    if (typeof price !== 'string') {
      return res.status(400).json({
        error: 'Le champ prix du produit doit être un chiffre',
      });
    }
    if (!/^-?\d*\.?\d*$/.test(price)) {
      return res.status(400).json({
        error: 'Veuillez utiliser des chiffres pour saisir le prix.',
      });
    }

    if (stock === null || stock === undefined || stock === '') {
      return res.status(400).json({
        error: "Le champ stock du produit n'est pas renseigné",
      });
    }
    if (typeof stock !== 'string') {
      return res.status(400).json({
        error: 'Le champ stock du produit doit être une chaîne de caractères',
      });
    }
    if (!/^-?\d*\.?\d*$/.test(price)) {
      return res.status(400).json({
        error: 'Veuillez utiliser des chiffres pour saisir le stock.',
      });
    }

    if (
      description === null ||
      description === undefined ||
      description === ''
    ) {
      return res.status(400).json({
        error: "Le champ description du produit n'est pas renseigné",
      });
    }
    if (typeof description !== 'string') {
      return res.status(400).json({
        error:
          'Le champ description du produit doit être une chaîne de caractères',
      });
    }

    if (image === null || image === undefined || image === '') {
      return res.status(400).json({
        error: "Le champ image du produit n'est pas renseigné",
      });
    }
    if (typeof image !== 'string') {
      return res.status(400).json({
        error: 'Le champ image du produit doit être une chaîne de caractères',
      });
    }
    if (
      !/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi.test(
        image
      )
    ) {
      return res.status(400).json({
        error:
          "Veuillez entrer un lien URL de l'image du produit hébergé au format 'http://www.nomdusite.jpg' ou 'https://www.nomdusite.jpg'.",
      });
    }

    const newProduct = await productsController.addProduct(req.body);

    return res.status(201).json({
      id: newProduct.id,
      name: newProduct.name,
      type: newProduct.type,
      price: newProduct.price,
      stock: newProduct.stock,
      description: newProduct.description,
      image: newProduct.image,
    });
  }
);

router.patch(
  '/products/',
  authMid.authenticateJWT,
  authMid.isAdmin,
  async (req, res) => {
    const { name, price, stock, description, image } = req.body;

    if (name === null || name === undefined || name === '') {
      return res.status(400).json({
        error: "Le champ nom du produit n'est pas renseigné",
      });
    }
    if (typeof name !== 'string') {
      return res.status(400).json({
        error: 'Le champ nom du produit doit être une chaîne de caractères',
      });
    }

    if (price === null || price === undefined || price === '') {
      return res.status(400).json({
        error: "Le champ prix du produit n'est pas renseigné",
      });
    }
    if (typeof price !== 'string') {
      return res.status(400).json({
        error: 'Le champ prix du produit doit être une chaîne de caractères',
      });
    }
    if (!/^-?\d*\.?\d*$/.test(price)) {
      return res.status(400).json({
        error: 'Veuillez utiliser des chiffres pour saisir le prix.',
      });
    }

    if (stock === null || stock === undefined || stock === '') {
      return res.status(400).json({
        error: "Le champ stock du produit n'est pas renseigné",
      });
    }
    if (typeof stock !== 'string') {
      return res.status(400).json({
        error: 'Le champ stock du produit doit être une chaîne de caractères',
      });
    }
    if (!/^-?\d*\.?\d*$/.test(price)) {
      return res.status(400).json({
        error: 'Veuillez utiliser des chiffres pour saisir le stock.',
      });
    }

    if (
      description === null ||
      description === undefined ||
      description === ''
    ) {
      return res.status(400).json({
        error: "Le champ description du produit n'est pas renseigné",
      });
    }
    if (typeof description !== 'string') {
      return res.status(400).json({
        error:
          'Le champ description du produit doit être une chaîne de caractères',
      });
    }

    if (image === null || image === undefined || image === '') {
      return res.status(400).json({
        error: "Le champ image du produit n'est pas renseigné",
      });
    }
    if (typeof image !== 'string') {
      return res.status(400).json({
        error: 'Le champ image du produit doit être une chaîne de caractères',
      });
    }
    if (
      !/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi.test(
        image
      )
    ) {
      return res.status(400).json({
        error:
          "Veuillez entrer un lien URL de l'image du produit hébergé au format 'http://www.nomdusite.jpg' ou 'https://www.nomdusite.jpg'.",
      });
    }

    const productUpdated = await productsController.updateProduct(req.body);

    if (!productUpdated) {
      return res.status(404).json({
        message: "La ressource demandée n'existe pas",
      });
    }

    return res.status(200).json({
      name: productUpdated.name,
      type: productUpdated.type,
      price: productUpdated.price,
      stock: productUpdated.stock,
      description: productUpdated.description,
      image: productUpdated.image,
    });
  }
);

router.delete(
  '/products/',
  authMid.authenticateJWT,
  authMid.isAdmin,
  async (req, res) => {
    const { id } = req.body;

    const productFound = await productsController.getProductById(id);

    if (!productFound) {
      return res.status(404).json({
        message: "La ressource demandée n'existe pas",
      });
    }

    await productsController.deleteProduct(id);
    return res.status(200).json({
      message: 'La ressource a bien été supprimée',
    });
  }
);

router.post('/cart', async (req, res) => {
  // console.log('ert', req.body.id);
  // console.log('ret', req.body);
  // console.log('retu', req.body.localStorage);
  delete req.body.localStorage.token;
  const productsFound = await productsController.getProductFromCart(req.body);
  res.status(201).json(productsFound);
  // return res.status(201).json({
  //   id: productsFound.id,
  //   name: productsFound.name,
  //   type: productsFound.type,
  //   price: productsFound.price,
  //   stock: productsFound.stock,
  //   description: productsFound.description,
  //   image: productsFound.image,
  //   quantity: productsFound.value,
  // });
});

router.post('/payment', async (req, res) => {
  const { amount, name, email } = req.body;
  // console.log('paymnt', req.body);
  // console.log('test amount ', typeof amount);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: 'eur',
    description: name,
    recepient_email: email,
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

module.exports = router;
