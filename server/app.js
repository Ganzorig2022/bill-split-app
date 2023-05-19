const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const {
  usersRouter,
  groupsRouter,
  debtsRouter,
  expensesRouter,
} = require('./src/routes');

//middlewares
app.use(morgan('dev'));
app.use(express.json());

//prevent from CORS policy error
app.use(cors());

//localhost:port/group/id/users
app.use('/group/:id', usersRouter);

//localhost:port/group
app.use('/group', groupsRouter);

// //localhost:port/group/id/debts
app.use('/group/:id', debtsRouter);

// //localhost:port/group/id/expenses
app.use('/group/:id', expensesRouter);

module.exports = app;
