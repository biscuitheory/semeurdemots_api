const statusNames = [
  'Pending',
  'Processing',
  'Cancelled',
  'Completed',
  'Refunded',
];
const statuses = statusNames.map((status) => {
  return {
    name: status,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Statuses', statuses, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Statuses', null, {});
  },
};
