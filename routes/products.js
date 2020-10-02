const express = require('express');

const productsController = require('../controllers/products');
const authMid = require('../utils/jwt.utils');

const router = express.Router();

router.post('/commander', authMid.authenticateJWT, async (req, res) => {
  const { userAdmin } = req.user;
  const { name } = req.body;

  if (userAdmin === false) {
    return res.status(403).json({
      message: "Vous n'êtes pas autorisé à accéder à cette ressource",
    });
  }

  const newProduct = await productsController.addProduct(req.body);

  return res.status(201).json({
    id: newProduct.id,
    name: newProduct.name,
  });
});

router.get('/commander', authMid.authenticateJWT, async (req, res) => {
  const { userAdmin } = req.user;

  if (userAdmin === false) {
    return res.status(403).json({
      message: "Vous n'êtes pas autorisé à accéder à cette ressource",
    });
  }

  const productsFound = await productsController.getProducts();
  res.status(201).json(productsFound);
});

// router.get('/cart', async (req, res) => {});

// router.get('/checkout', async (req, res) => {});

// router.post('/cart', async (req, res) => {
//   const addProductToCart = await productsController.addToCart(req.body, userId);
//   return res.status(201).json(addProductToCart);
// });

// router.post('/checkout', async (req, res) => {
//   //post > ajoute un order dans la route order (post order ?)
// });

module.exports = router;
