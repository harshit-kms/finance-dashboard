import React, { useContext, useState } from 'react'
import axios from "axios";

const BASE_URL = "http://localhost:5050/api/";

const GlobalContext = React.createContext()

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)
    const addIncome = async (income) => {
        const response = await axios.post(`${BASE_URL}add-income`, income)
            setIncomes(response.data)
    }

    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-income`)
        setIncomes(response.data)
    }

    const addExpense = async (expense) => {
        const response = await axios.post(`${BASE_URL}add-expense`, expense)
        setExpenses(response.data)
    }

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expenses`)
        setExpenses(response.data)
    }

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            addExpense,
            getExpenses,
            expenses,
            error
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}