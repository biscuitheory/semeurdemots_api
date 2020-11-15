const express = require('express');

const ordersProductsController = require('../controllers/orders_products');
const authMid = require('../utils/jwt.utils');

const router = express.Router();

router.post(
  '/fullorder',
  authMid.authenticateJWT,
  authMid.isAdmin,
  async (req, res) => {
    const { order_id, product_id, quantity } = req.body;
    console.log('gneee ', req.body.products);


    const newFullOrder = await ordersProductsController.addFullOrder(
      order_id,
      product_id,
      quantity
    );

    return res.status(201).json({
      id: newFullOrder.id,
      product_id: newFullOrder.product_id,
      order_id: newFullOrder.order_id,
      quantity: newFullOrder.quantity,
    });
  }
);

router.get('/fullorder', async (req, res) => {
  const { order_id, product_id } = req.body;
  const ordersFound = await ordersProductsController.getOrder(
    order_id,
    product_id
  );
  res.status(201).json(ordersFound);
});

module.exports = router;
