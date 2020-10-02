const { v4: uuidv4 } = require('uuid');
const faker = require('faker');

const users = [...Array(5)].map((user) => ({
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
  admin: false,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', users, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
