const Products = require('../models/Products');

exports.showAllProducts = (req, res) => {
  Products.showAllProducts(function () {
    res.render('/products', {
      name: name
    });
  });
};
