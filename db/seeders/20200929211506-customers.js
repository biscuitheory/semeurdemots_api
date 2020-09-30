const { v4: uuidv4 } = require('uuid');
const faker = require('faker');

const customers = [...Array(50)].map((customer) => ({
  id: uuidv4(),
  firstname: faker.name.firstName(),
  lastname: faker.name.lastName(),
  address: faker.address.streetAddress(),
  zipcode: faker.address.zipCode(),
  city: faker.address.city(),
  country: faker.address.country(),
  phone: faker.phone.phoneNumber(),
  email: faker.internet.email(),
  username: faker.internet.userName(),
  password: faker.internet.password(8),
  createdAt: new Date(),
  updatedAt: new Date(),
}));

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Customers', customers, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Customers', null, {});
  },
};
