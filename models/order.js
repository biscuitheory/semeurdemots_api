'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: {
          name: 'user_id',
        },
      });
      this.belongsToMany(models.Product, {
        through: 'OrderProduct',
        foreignKey: 'order_id',
        otherKey: 'product_id',
      });
      this.belongsTo(models.Status, {
        foreignKey: {
          name: 'status_id',
        },
      });
    }
  }
  Order.init(
    {
      user_id: DataTypes.UUID,
      status_id: DataTypes.INTEGER,
      shipping_firstname: DataTypes.STRING,
      shipping_lastname: DataTypes.STRING,
      shipping_address: DataTypes.STRING,
      shipping_zipcode: DataTypes.STRING,
      shipping_city: DataTypes.STRING,
      shipping_country: DataTypes.STRING,
      total_price: DataTypes.INTEGER,
      payment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Order',
    }
  );
  return Order;
};
