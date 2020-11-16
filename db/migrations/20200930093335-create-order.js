'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.UUID,
      },
      status_id: {
        type: Sequelize.INTEGER,
      },
      shipping_firstname: {
        type: Sequelize.STRING,
      },
      shipping_lastname: {
        type: Sequelize.STRING,
      },
      shipping_address: {
        type: Sequelize.STRING,
      },
      shipping_zipcode: {
        type: Sequelize.STRING,
      },
      shipping_city: {
        type: Sequelize.STRING,
      },
      shipping_country: {
        type: Sequelize.STRING,
      },
      total_price: {
        type: Sequelize.INTEGER,
      },
      payment: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
  },
};
