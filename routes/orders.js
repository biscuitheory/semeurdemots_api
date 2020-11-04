const express = require('express');
require('dotenv').config();

const statusesController = require('../controllers/statuses');
const ordersController = require('../controllers/orders');

const router = express.Router();

router.get('/orders', async (req, res) => {
  const ordersFound = await ordersController.getAllOrders();
  res.status(201).json(ordersFound);
});

router.get('/orders/:id', async (req, res) => {
  const orderFound = await ordersController.getOrderById(req.params);
  if (!orderFound) {
    return res.status(404).json({
      error: "La commande demandée n'existe pas",
    });
  }
  return res.status(200).json({
    id: orderFound.id,
    user_id: orderFound.user_id,
    status_id: orderFound.Status.name,
    shipping_firstname: orderFound.shipping_firstname,
    shipping_lastname: orderFound.shipping_lastname,
    shipping_address: orderFound.shipping_address,
    shipping_zipcode: orderFound.shipping_zipcode,
    shipping_city: orderFound.shipping_city,
    shipping_country: orderFound.shipping_country,
    payment: orderFound.payment,
  });
});

router.post('/orders', async (req, res) => {
  // const { } = req.body.id;
  console.log('retou', req.body);
  const newOrder = await ordersController.addOrder(req.body);
  const orderStatus = await statusesController.getStatusById(
    req.body.status_id
  );

  return res.status(201).json({
    id: newOrder.id,
    user_id: newOrder.user_id,
    status_id: orderStatus.name,
    shipping_firstname: newOrder.shipping_firstname,
    shipping_lastname: newOrder.shipping_lastname,
    shipping_address: newOrder.shipping_address,
    shipping_zipcode: newOrder.shipping_zipcode,
    shipping_city: newOrder.shipping_city,
    shipping_country: newOrder.shipping_country,
    payment: newOrder.payment,
  });
});

router.patch('/orders', async (req, res) => {
  const { id, status_id } = req.body;
  console.log('wala ', id);

  const orderUpdated = await ordersController.updateOrder(
    req.body,
    status_id,
    id
  );
  const orderStatus = await statusesController.getStatusById(
    req.body.status_id
  );

  // console.log('ic ', orderUpdated.id);
  if (!orderUpdated) {
    return res.status(404).json({
      message: "La commande demandée n'existe pas",
    });
  }

  return res.status(200).json({
    id: orderUpdated.id,
    user_id: orderUpdated.user_id,
    status_id: orderStatus.name,
    shipping_firstname: orderUpdated.shipping_firstname,
    shipping_lastname: orderUpdated.shipping_lastname,
    shipping_address: orderUpdated.shipping_address,
    shipping_zipcode: orderUpdated.shipping_zipcode,
    shipping_city: orderUpdated.shipping_city,
    shipping_country: orderUpdated.shipping_country,
    payment: orderUpdated.payment,
  });
});

module.exports = router;
