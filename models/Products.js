const connection = require('../config/db.config');

class Products {
  static showAllProducts(cb) {
    connection.query('SELECT * FROM `products`', (err, products) => {
      if (err) throw err;
      console.log(products);
      cb(products);
    });
  }
}

module.exports = Products;
