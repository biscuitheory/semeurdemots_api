const { v4: uuidv4 } = require('uuid');
const db = require('../models');

// const { Order, Status, Order_Product, Product } = db;
const { Order, Status, OrderProduct, Product } = db;

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
      total_price,
      payment,
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
      total_price,
      payment,
    });
  },

  getOrderById: (order_id) => {
    return Order.findByPk(order_id.id, {
      include: [
        {
          model: Status,
          attributes: ['name'],
        },
      ],
    });
  },

  getOrdersByUserId: (userId) => {
    console.log('kiki ', userId);
    return Order.findAll({
      where: {
        // user_id: user_id,
        user_id: userId,
      },
      include: [
        {
          model: Product,
          // as: 'Product',
          // attributes: ['product_id'],
          through: {
            attributes: ['product_id', 'quantity'],
            // where: {
            //   user_id: userId,
            // },
          },
        },
      ],
      // include: [Product],
    });
  },

  getAllOrders: () => {
    return Order.findAll({
      include: [
        {
          model: Status,
          attributes: ['name'],
        },
      ],
      attributes: [
        'id',
        'user_id',
        'status_id',
        'shipping_firstname',
        'shipping_lastname',
        'shipping_address',
        'shipping_zipcode',
        'shipping_city',
        'shipping_country',
        'total_price',
        'payment',
      ],
    });
  },

  updateOrder: async (data, status_id, id) => {
    // console.log('yoyo', id);
    const orderFound = await Order.findByPk(id);
    if (!orderFound) {
      return orderFound;
    }
    console.log('yoyo', data);
    return orderFound.update(data);
  },
};
