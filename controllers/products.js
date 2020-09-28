const Products = require('../models/Products');

exports.showAllProducts = (req, res) => {
  Products.showAllProducts(function () {
    res.send('Products fetched...');
  });
};
