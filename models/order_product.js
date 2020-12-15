'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrderProduct extends Model {}
  OrderProduct.init(
    {
      product_id: DataTypes.INTEGER,
      order_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'OrderProduct',
    }
  );
  return OrderProduct;
};
