const faker = require('faker');

const products = [...Array(5)].map((product) => {
  const productType = ['livre', 'produit dérivé'];
  const randomProductType =
    productType[Math.floor(Math.random() * productType.length)];
  return {
    name: faker.commerce.productName(),
    type: randomProductType,
    price: faker.commerce.price(),
    stock: faker.random.number(),
    description: faker.commerce.productDescription(),
    image: faker.image.cats(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', products, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  },
};
