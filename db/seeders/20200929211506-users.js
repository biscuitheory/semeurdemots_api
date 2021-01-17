const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const users = [
  {
    id: uuidv4(),
    firstname: 'Mask',
    lastname: 'Tuxedo',
    address: 'Tuxedo Mask Street House',
    zipcode: '1001-100',
    city: 'Tokyo',
    country: 'Japon',
    phone: '0909090909',
    email: process.env.ADMIN_EMAIL,
    username: 'Tuxedo',
    password: process.env.ADMIN_PWD,
    admin: process.env.ADMIN_USER,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', users, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
