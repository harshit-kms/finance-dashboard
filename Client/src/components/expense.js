import React, { useEffect } from "react";
import styled from "styled-components";
import Card from "../components/card.js";
import HistoryLog from "../components/historyLog.js";
import { useGlobalContext } from "../context/globalContext.js";

function Expense() {

    const { getExpenses, totalExpense, expenses } = useGlobalContext();

    useEffect(() => {
        getExpenses()
    }, [])

    const cards = [
        { icon: "call_received", title: "Total Expense", money: `$${totalExpense().toFixed(2)}` },
        { icon: "arrow_downward", title: "Minimum", money: `$${Math.min(...expenses.map(item => item.amount)).toFixed(2)}` },
        { icon: "arrow_upward", title: "Maximum", money: `$${Math.max(...expenses.map(item => item.amount)).toFixed(2)}` },
        { icon: "compress", title: "Average", money: `$${(totalExpense() / expenses.length).toFixed(2)}` }
    ];

    return (
        <ExpenseStyled>
            <div className="title-description-container">
                <h1 className="title">Expenses</h1>
                <h2 className="description">Manage and keep track of your expenses.</h2>
            </div>
            <div className="card-container">
                {cards.map((card, index) => (
                    <Card key={index} icon={card.icon} title={card.title} money={card.money} />
                ))}
            </div>
            <HistoryLog
                title="Expense History" transactionType="expense"
            />
        </ExpenseStyled>
    );
}

const ExpenseStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 3.313rem auto;
    max-width: 66.25rem;
    .title-description-container{
        width: 100%;
    }
    .title{
        font-size: 1.875rem;
        font-weight: 600;
        text-align: left;
    }
    .description{
        font-size: 1rem;
        font-weight: 400;
        color: #4B4B4B;
        margin-bottom: 0.938rem;
        text-align: left;
    }
    .card-container{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.938rem;
    }
    @media (max-width: 1439px) {
        max-width: 50rem;
        padding: 0 1.875rem;
    }
`;
export default Expense