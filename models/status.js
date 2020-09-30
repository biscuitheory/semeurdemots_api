'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    static associate(models) {
      this.hasMany(models.Order, {
        foreignKey: {
          name: 'status_id',
        },
      });
    }
  }
  Status.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Status',
    }
  );
  return Status;
};
