const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      this.belongsToMany(models.Order, {
        through: 'Order_products',
        foreignKey: {
          name: 'product_id',
        },
      });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      price: DataTypes.STRING,
      stock: DataTypes.STRING,
      description: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Product',
    }
  );
  return Product;
};
