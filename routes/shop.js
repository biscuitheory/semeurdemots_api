const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/commander', async (req, res) => {
  const productsFound = await shopController.getProducts();
  res.status(201).json(productsFound);
});

router.get('/cart', async (req, res) => {});

router.get('/checkout', async (req, res) => {});

router.post('/cart', async (req, res) => {
  const addProductToCart = await shopController.addToCart(req.body, customerId);
  return res.status(201).json(addProductToCart);
});

router.post('/checkout', async (req, res) => {
  //post > ajoute un order dans la route order (post order ?)
});

module.exports = router;
