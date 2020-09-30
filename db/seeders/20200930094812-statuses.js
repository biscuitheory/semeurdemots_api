const statuses = [...Array(5)].map((status) => {
  const statusNames = [
    'Pending',
    'Processing',
    'Cancelled',
    'Completed',
    'Refunded',
  ];
  const statusNamesOrdered = statusNames.map((statusName) => {
    return statusName;
  });
  return {
    name: statusNamesOrdered,
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
