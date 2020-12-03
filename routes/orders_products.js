const express = require('express');
const orders = require('../controllers/orders');

const ordersController = require('../controllers/orders');
const ordersProductsController = require('../controllers/orders_products');
const authMid = require('../utils/jwt.utils');

const router = express.Router();

router.post('/fullorder', authMid.authenticateJWT, async (req, res) => {
  const { order_id, product_id, quantity } = req.body;
  console.log('post fullorder passed values ', req.body);

  const newFullOrder = await ordersProductsController.addOrderProduct(
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
});

router.post('/customerorders', async (req, res) => {
  // const { user_id } = req.body;
  const { user_id } = req.body;
  console.log('post user_id customerorders ', req.body);

  // recuperer les orders avec user_id de la requête
  // const ordersFound = await ordersController.getOrdersByUserId(user_id);
  const ordersFound = await ordersController.getOrdersByUserId(user_id);

  // console.log('ordersFound ', ordersFound);

  if (!ordersFound) {
    return res.status(404).json({
      error: "Il n'y a pas de commandes passées par cet user_id",
    });
  }

  return res.status(201).json(ordersFound);
});

router.get('/allorders', async (req, res) => {
  const ordersFound = await ordersController.getOrdersProducts(
    req.body
  );
  res.status(201).json(ordersFound);
});

// router.get('/allcustomersorders', async (req, res) => {
//   const allOrdersFound = await ordersProductsController.getAllCustomersOrders(
//     req.body
//   );
//   res.status(201).json(allOrdersFound);
// });

module.exports = router;
