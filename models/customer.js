const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      this.hasMany(models.Order, {
        foreignKey: {
          name: 'customer_id',
        },
      });
    }
  }
  Customer.init(
    {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      address: DataTypes.STRING,
      zipcode: DataTypes.STRING,
      city: DataTypes.STRING,
      country: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Customer',
    }
  );
  return Customer;
};
