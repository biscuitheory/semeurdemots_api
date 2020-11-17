const db = require('../models');
const products = require('./products');

// const { Order_Product, Product } = db;
const { OrderProduct, Product } = db;

module.exports = {
  addOrderProduct: (order_id, product_id, quantity) => {
    return OrderProduct.create({
      product_id,
      order_id,
      quantity,
    });
  },

  getOrdersProducts: (order_id, product_id) => {
    return OrderProduct.findAll({
      include: [
        {
          model: Product,
        },
      ],
      where: {
        order_id,
        product_id,
      },
    });
  },
};
