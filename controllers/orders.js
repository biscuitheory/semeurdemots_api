const { v4: uuidv4 } = require('uuid');
const db = require('../models');

const { Order } = db;

module.exports = {
  addOrder: async (data) => {
    const {
      user_id,
      status_id,
      shipping_firstname,
      shipping_lastname,
      shipping_address,
      shipping_zipcode,
      shipping_city,
      shipping_country,
      payment
    } = data;

    return Order.create({
      user_id,
      status_id,
      shipping_firstname,
      shipping_lastname,
      shipping_address,
      shipping_zipcode,
      shipping_city,
      shipping_country,
      payment,
    });
  },
};
