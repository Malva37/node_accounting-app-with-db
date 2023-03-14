'use strict';

const usersServises = require('../services/users');

const getAll = async(req, res) => {
  const users = await usersServises.getAll();

  res.send(
    users.map(usersServises.normalize)
  );
};

const getOne = async(req, res) => {
  const { userId } = req.params;
  const foundUser = await usersServises.getOne(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(
    usersServises.normalize(foundUser)
  );
};

const add = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await usersServises.create(name);

  res.statusCode = 201;

  res.send(newUser);
};

const remove = async(req, res) => {
  const { userId } = req.params;

  const foundUser = await usersServises.getOne(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  await usersServises.remove(userId);
  res.sendStatus(204);
};

const update = async(req, res) => {
  const { userId } = req.params;
  const foundUser = await usersServises.getOne(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (typeof name !== 'string' || !name) {
    res.sendStatus(422);

    return;
  }

  await usersServises.update({
    id: userId,
    name,
  });

  res.send(foundUser);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
