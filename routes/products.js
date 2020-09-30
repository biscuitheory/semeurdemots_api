const express = require('express');
const faker = require('faker');

const productsController = require('../controllers/products');

const router = express.Router();

router.get('/products', async (req, res) => {
  // console.log(faker.random.number());
  // const productType = ['book', 'produit dérivé'];
  // const randomProductType =
  //   productType[Math.floor(Math.random() * productType.length)];
  // console.log(randomProductType);
  const productsFound = await productsController.showAllProducts();
  res.status(201).json(productsFound);
});

module.exports = router;
