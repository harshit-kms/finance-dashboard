const express = require('express');
const router = express.Router();
const { addIncome, getIncome, deleteIncome } = require('../controllers/income.js');
const { addExpense, getExpense, deleteExpense} = require('../controllers/expense.js')
const { addUser, logUser } = require('../controllers/user.js')
router.post('/add-income', addIncome)
    .get('/get-income', getIncome)
    .delete('/delete-income/:id', deleteIncome)
    .post('/add-expense', addExpense)
    .get('/get-expense', getExpense)
    .delete('/delete-expense/:id', deleteExpense)
    .post('/login', logUser)
module.exports = router