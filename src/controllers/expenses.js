'use strict';

const expenseService = require('./../services/expenses');
const userService = require('./../services/users');

const getAll = async(req, res) => {
  const filters = req.query;
  const filteredExpenses = await expenseService.getAll(filters);

  res.send(
    filteredExpenses.map(expenseService.normalize)
  );
};

const getOne = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expenseService.getOne(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(
    expenseService.normalize(foundExpense)
  );
};

const create = async(req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
  } = req.body;

  const foundUser = userService.getOne(userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  const hasAllData = (spentAt
    && title
    && amount
    && category
  );

  if (!hasAllData) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await expenseService.create(req.body);

  res.status(201);
  res.send(newExpense);
};

const update = async(req, res) => {
  const { expenseId } = req.params;
  const data = req.body;
  const updatedRowsNumber = await expenseService.update(expenseId, data);

  if (updatedRowsNumber > 0) {
    res.send(data);
  } else {
    res.sendStatus(404);
  }
};

const remove = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expenseService.getOne(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  await expenseService.remove(expenseId);

  res.sendStatus(204);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
