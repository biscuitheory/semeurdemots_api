const db = require('../models');
const products = require('./products');

// const { Order_Product, Product } = db;
const { OrderProduct, Product } = db;

module.exports = {
  addFullOrder: (order_id, product_id, quantity) => {
    return OrderProduct.create({
      product_id,
      order_id,
      quantity,
    });
  },

  getOrder: (order_id, product_id) => {
    return OrderProduct.findOne({
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
