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

  updateProduct: async (data) => {
    // console.log(data.id);
    const { id } = data;
    const productFound = await Product.findByPk(id);
    if (!productFound) {
      return productFound;
    }
    return productFound.update(data);
  },

  // getProductById: (productId) => {
  //   // return Product.findByPk(productId.id);
  //   return Product.findByPk(productId);
  // },

  getProductFromCart: async (data) => {
    const products = await Product.findAll();
    const filteredProducts = [];

    // console.log('touc', data);

    products.forEach((product) => {
      for (let [key, value] of Object.entries(data.localStorage)) {
        // console.log('papi', key, value)
        if (key == product.id) {
          product.dataValues.quantity = value
          filteredProducts.push(product)
          // console.log('prod', product)
        }
      }
    });

    // console.log('dadu', filteredProducts);
    return filteredProducts;
  },
};
