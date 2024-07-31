const express = require('express');
const router = express.Router();
const { addIncome, getIncome, deleteIncome } = require('../controllers/income.js');
const { addExpense, getExpense, deleteExpense} = require('../controllers/expense.js')

router.post('/add-income', addIncome)
    .get('/get-income', getIncome)
    .delete('/delete-income/:id', deleteIncome)
    .post('/add-expense', addExpense)
    .get('/get-expense', getExpense)
    .delete('/delete-expense/:id', deleteExpense)
module.exports = router