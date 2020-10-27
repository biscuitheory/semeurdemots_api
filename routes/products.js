const express = require('express');
require('dotenv').config();
const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);

const productsController = require('../controllers/products');
const { authenticateJWT } = require('../utils/jwt.utils');
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
    const { userAdmin } = req.user;

    if (userAdmin === false) {
      return res.status(403).json({
        message: "Vous n'êtes pas autorisé à accéder à cette ressource",
      });
    }

    const newProduct = await productsController.addProduct(req.body);
    // console.log(newProduct);

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

router.patch('/products/', authenticateJWT, async (req, res) => {
  const { productId } = req.params;
  const { name } = req.body;

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

  // console.log(req.body);
  const productUpdated = await productsController.updateProduct(
    req.body,
    productId
  );

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
});

router.post('/cart', async (req, res) => {
  // console.log('ert', req.body.id);
  console.log('ret', req.body);
  console.log('retu', req.body.localStorage);
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
  console.log('paymnt', req.body);
  console.log('test amount ', typeof amount);
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

// router.get('/checkout', async (req, res) => {});

// router.post('/cart', async (req, res) => {
//   const addProductToCart = await productsController.addToCart(req.body, userId);
//   return res.status(201).json(addProductToCart);
// });

// router.post('/checkout', async (req, res) => {
//   //post > ajoute un order dans la route order (post order ?)
// });

module.exports = router;
