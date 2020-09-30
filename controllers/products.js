const db = require('../models');

const { Product } = db;

module.exports = {
  getProducts: () => {
    return Product.findAll({
      attributes: ['id', 'name', 'price', 'stock', 'description', 'image'],
    });
  },
};
