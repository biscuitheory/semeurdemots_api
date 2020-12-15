const { v4: uuidv4 } = require('uuid');
const db = require('../models');

// const { Order, Status, Order_Product, Product } = db;
const { Order, Status, Product, User } = db;

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

  getOrdersByUserId: (user_id) => {
    // console.log('kiki ', userId);
    return Order.findAll({
      where: {
        user_id: user_id,
      },
      include: [
        {
          model: Product,
          through: {
            attributes: ['product_id', 'quantity'],
          },
        },
      ],
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

  getOrdersProducts: () => {
    return Order.findAll({
      include: [
        {
          model: Product,
          through: {
            attributes: ['product_id', 'quantity'],
          },
        },
        {
          model: Status,
          attributes: ['name'],
        },
        {
          model: User,
          attributes: [
            'firstname',
            'lastname',
            'address',
            'zipcode',
            'city',
            'country',
            'phone',
            'email',
          ],
        },
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
