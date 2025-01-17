import React, { useContext, useState } from 'react'
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const GlobalContext = React.createContext()

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    const addIncome = async (income) => {
        try {
            await axios.post(`${BASE_URL}add-income`, { ...income, type: 'income' });
            getIncomes()
        }
        catch (err) {
            setError(err.response?.data?.message || 'An error occurred while adding income');
        }
    }

    const addExpense = async (expense) => {
        try {
            await axios.post(`${BASE_URL}add-expense`, { ...expense, type: 'expense' });
            getExpenses()
        }
        catch (err) {
            setError(err.response?.data?.message || 'An error occurred while adding expense');
        }
    }

    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-income`)
        setIncomes(response.data)
    }

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expense`)
        setExpenses(response.data)
    }

    const deleteIncome = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-income/${id}`);
            getIncomes()
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred while deleting income');
        }
    }

    const deleteExpense = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-expense/${id}`);
            getExpenses()
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred while deleting expense');
        }
    }

    const totalIncome = () => {
        return incomes.reduce((total, income) => total + parseFloat(income.amount), 0);
    }

    const totalExpense = () => {
        return expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
    }

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            deleteIncome,
            incomes,
            addExpense,
            getExpenses,
            deleteExpense,
            expenses,
            totalIncome,
            totalExpense,
            error
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}