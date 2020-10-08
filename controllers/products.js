const db = require('../models');

const { Product } = db;

module.exports = {
  addProduct: async (data) => {
    const { id, name, type, price, stock, description, image } = data;

    return Product.create({
      id,
      name,
      type,
      price,
      stock,
      description,
      image,
    });
  },

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
