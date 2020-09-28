const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const productsRouter = require('./products');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(productsRouter);

router.get('/', (req, res) => {
  return res.send('Home');
});

router.get('*', (req, res) => {
  res.status(404).json({
    error: 'Vous vous êtes trompés de route !',
  });
});

module.exports = router;
