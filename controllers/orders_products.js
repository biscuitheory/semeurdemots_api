const db = require('../models');

const { OrderProduct, Product } = db;

module.exports = {
  addOrderProduct: (order_id, product_id, quantity) => {
    return OrderProduct.create({
      product_id,
      order_id,
      quantity,
    });
  },

  getOrdersProducts: () => {
    return OrderProduct.findAll({
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

  // getAllCustomersOrders: (req.body) => {
  //   return OrderProduct.findAll({

  //   })
  // }
};
