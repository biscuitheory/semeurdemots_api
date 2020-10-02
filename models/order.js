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
        through: 'Order_products',
        foreignKey: {
          name: 'product_id',
        },
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
    },
    {
      sequelize,
      modelName: 'Order',
    }
  );
  return Order;
};
