const express = require('express');
require('dotenv').config();

const statusesController = require('../controllers/statuses');
const ordersController = require('../controllers/orders');

const router = express.Router();

router.get('/order:id', async (req, res) => {

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

module.exports = router;
