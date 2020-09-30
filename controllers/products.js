const Products = require('../models/product');

exports.showAllProducts = (req, res) => {
  Products.showAllProducts(function () {
    res.render('/products', {
      
    });
  });
};
