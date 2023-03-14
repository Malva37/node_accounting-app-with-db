'use strict';

const { Expense } = require('../models/Expense');

function normalize({
  id,
  title,
  userId,
  spentAt,
  amount,
  category,
  note,
}) {
  return {
    id,
    title,
    userId,
    spentAt,
    amount,
    category,
    note,
  };
};

const getAll = async({
  userId,
  categories,
  from,
  to,
}) => {
  let filteredExpenses = await Expense.findAll({
    order: ['createdAt'],
  });

  if (userId) {
    const userIdToNumber = +userId;

    filteredExpenses = filteredExpenses
      .filter(exp => exp.userId === userIdToNumber);
  }

  if (categories) {
    filteredExpenses = filteredExpenses
      .filter(expense => {
        return categories.includes(expense.category);
      });
  }

  if (from) {
    filteredExpenses = filteredExpenses
      .filter(expense => {
        return expense.spentAt > from;
      });
  }

  if (to) {
    filteredExpenses = filteredExpenses
      .filter(expense => {
        return expense.spentAt < to;
      });
  }

  return filteredExpenses;
};

const getOne = (expenseId) => {
  return Expense.findByPk(expenseId);
};

const create = (data) => {
  return Expense.create(data);
};

const update = (expenseId, data) => {
  return Expense.update(data, {
    where: { id: expenseId },
  });
};

const remove = async(expenseId) => {
  Expense.destroy({
    where: { id: expenseId },
  });
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
  normalize,
};
