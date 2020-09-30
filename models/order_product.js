'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderProduct extends Model {
    static associate(models) {
      this.belongsTo(models.Order, {
        foreignKey: {
          name: 'order_id',
        },
      });

      this.belongsTo(models.Product, {
        foreignKey: {
          name: 'product_id',
        },
      });
    }
  }
  OrderProduct.init(
    {
      product_id: DataTypes.INTEGER,
      order_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Order_Product',
    }
  );
  return OrderProduct;
};
