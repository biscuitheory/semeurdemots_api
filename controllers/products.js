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
    console.log(data.id);
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

    products.forEach((product) => {
      data.keys.forEach((key) => {
        if (key == product.id) {
          filteredProducts.push(product);
        }
      });
    });

    // console.log('dadu', filteredProducts);
    return filteredProducts;
  },
};
