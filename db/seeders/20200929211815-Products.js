const faker = require('faker');

const productType = ['book', 'produit dérivé'];
const randomProductType =
  productType[Math.floor(Math.random() * productType.length)];

const products = [...Array(5)].map((product) => ({
  name: faker.commerce.productName(),
  type: randomProductType,
  price: faker.commerce.price(),
  stock: faker.random.number(),
  description: faker.commerce.productDescription(),
  image: faker.image.cats(),
  createdAt: new Date(),
  updatedAt: new Date(),
}));

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', products, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  },
};
