const db = require('../models');

const { Product } = db;

module.exports = {
  addProduct: () => {},
  getProducts: () => {
    return Product.findAll({
      attributes: [
        'id',
        'name',
        'type',
        'price',
        'stock',
        'description',
        'image',
      ],
    });
  },
};
