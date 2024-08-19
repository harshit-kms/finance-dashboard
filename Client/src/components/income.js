import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { cards } from "../utils/cardItems";
import Card from "../components/card.js";
import HistoryLog from "../components/historyLog.js";
import { useGlobalContext } from "../context/globalContext.js";

function Income() {
<<<<<<< HEAD
    
    const { addIncome, incomes, getIncomes, deleteIncome } = useGlobalContext();

    useEffect(() => {
         getIncomes()

=======

    const { addIncome, incomes, getIncomes } = useGlobalContext();

    useEffect(() => {
        getIncomes()
>>>>>>> refs/remotes/origin/main
    }, [])

    return (
        <IncomeStyled>
            <h1 className="title">Incomes</h1>
            <h2 className="description">Manage and keep track of your income streams</h2>
            <div className="card-container">
                {cards.map((card) => (
                    <Card icon={card.icon} title={card.title} money={card.money} />
                ))}
            </div>
            <HistoryLog
                title="Income History" transactionType="income" deleteItem={deleteIncome}
            />
<<<<<<< HEAD
            
            
=======

>>>>>>> refs/remotes/origin/main
        </IncomeStyled>
    );
}

const IncomeStyled = styled.div`
    margin-top: 3.313rem;
    margin-left: 1.875rem;
    margin-right: 1.875rem;
    .title{
        font-size: 1.875rem;
        font-weight: 600;
    }
    .description{
        font-size: 1rem;
        font-weight: 400;
        color: #4B4B4B;
        margin-bottom: 0.938rem;
    }
    .card-container{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 0.938rem
    }
`;

export default Income