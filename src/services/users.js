'use strict';

const { User } = require('../models/User');

function normalize({ id, name }) {
  return {
    id,
    name,
  };
};

const getAll = () => {
  return User.findAll({
    order: ['createdAt'],
  });
};

const getOne = (userId) => {
  return User.findByPk(userId);
};

const create = (name) => {
  return User.create({ name });
};

const remove = async(userId) => {
  User.destroy({
    where: { id: userId },
  });
};

const update = async({ id, name }) => {
  return User.update({ name }, {
    where: { id },
  });
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
  normalize,
};
