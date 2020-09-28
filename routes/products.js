const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

router.get('/products', productsController.showAllProducts);

module.exports = router;
