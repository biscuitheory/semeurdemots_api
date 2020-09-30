const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

router.get('/products', async (req, res) => {
  const productsFound = await productsController.getProducts();
  res.status(201).json(productsFound);
});

module.exports = router;
