const express = require('express');
require('dotenv').config();
const nodemailer = require('nodemailer');

const statusesController = require('../controllers/statuses');
const ordersController = require('../controllers/orders');

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

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
  const { id, status_id, user_email, user_username } = req.body;
  console.log('wala ', req.body);

  const orderUpdated = await ordersController.updateOrder(
    req.body,
    status_id,
    id
  );
  const orderStatus = await statusesController.getStatusById(
    req.body.status_id
  );

  const mailOptions = {
    from: process.env.EMAIL,
    to: user_email,
    subject: `Confirmation de votre commande sur semeurdemots.fr`,
    html: `Chèr(e) ${user_username}, nous vous confirmons l'enregistrement de votre commande n°${id} passée en ce jour sur http://localhost:3000/compte-client et nous vous en remercions. Vous serez informé(e) par email de son expédition et pouvez également suivre son évolution à l'adresse http://localhost:3000/compte-client/suivi-commandes. A très bientôt sur www.semeurdemots.fr !`,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(`Email sent: '${info.response}`);
    }
  });

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
