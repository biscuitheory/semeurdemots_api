const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const productsRouter = require('./products');
const usersRouter = require('./users');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(usersRouter);
router.use(productsRouter);

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Home' });
});

router.get('*', (req, res) => {
  res.status(404).json({
    error: 'Vous vous êtes trompés de route !',
  });
});

module.exports = router;
