'use strict';

const { User } = require('./models/User');
const { Expense } = require('./models/Expense');

(async() => {
  await User.sync({ alter: true });
  await Expense.sync({ alter: true });
})();
