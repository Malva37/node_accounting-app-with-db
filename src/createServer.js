'use strict';

const express = require('express');
// const cors = require('cors');

const { router: userRouter } = require('./routes/users.js');
const { router: expenseRouter } = require('./routes/expenses');

// const userService = require('./services/users');
// const expenseService = require('./services/expenses');

const server = express();

// server.use(cors());
server.use('/users', express.json(), userRouter);
server.use('/expenses', express.json(), expenseRouter);

module.exports = {
  server,
};
