const { Op } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const db = require('../models');

const { User } = db;

module.exports = {
  addUser: async (data) => {
    const {
      firstname,
      lastname,
      address,
      zipcode,
      city,
      country,
      phone,
      email,
      username,
      password,
      admin,
    } = data;

    const hashedPassword = await bcrypt.hash(password, 10);

    return User.create({
      id: uuidv4(),
      firstname,
      lastname,
      address,
      zipcode,
      city,
      country,
      phone,
      email,
      username,
      password: hashedPassword,
      admin,
    });
  },

  checkEmail: (userEmail) => {
    return User.findOne({
      attributes: ['email'],
      where: {
        email: userEmail,
      },
    });
  },

  getUserByEmail: (userEmail) => {
    return User.findOne({
      where: {
        email: userEmail,
      },
    });
  },

  getUserByEmailOrUsername: (userEmailOrUsername) => {
    return User.findOne({
      where: {
        [Op.or]: [
          { username: userEmailOrUsername },
          { email: userEmailOrUsername },
        ],
      },
    });
  },

  checkPassword: async (password, userPassword) => {
    return bcrypt.compare(password, userPassword);
  },

  getIdentifiedUser: (userId) => {
    return User.findByPk(userId);
  },

  getUserById: (userId) => {
    return User.findByPk(userId.id);
  },



  getAllUsers: () => {
    return User.findAll({
      attributes: [
        'id',
        'firstname',
        'lastname',
        'address',
        'zipcode',
        'city',
        'country',
        'phone',
        'username',
        'email',
        'admin',
      ],
    });
  },

  updateUser: async (data, userId) => {
    const userFound = await User.findByPk(userId.id);
    if (!userFound) {
      return userFound;
    }
    return userFound.update(data);
  },

  deleteUser: async (userId) => {
    return User.destroy({
      where: {
        id: userId.id,
      },
    });
  },
};
