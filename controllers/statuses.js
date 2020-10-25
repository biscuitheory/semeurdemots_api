const db = require('../models');

const { Status } = db;

module.exports = {
  getAllStatuses: () => {
    return Status.findAll({
      attributes: ['id', 'name'],
    });
  },

  getStatusById: (id) => {
    return Status.findByPk(id, {
      attributes: ['name'],
    });
  },
};
