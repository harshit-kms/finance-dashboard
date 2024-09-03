import React, { useEffect } from "react";
import styled from "styled-components";
import Card from "../components/card.js";
import { useGlobalContext } from "../context/globalContext.js";
import Chart from "../components/chart.js"
import HistoryLog from "../components/historyLog.js";
import PieChart from "../components/pieChart.js"
import { useUser } from '../context/userContext';
function Dashboard() {
    const { getExpenses, totalExpense, expenses, getIncomes, totalIncome, incomes } = useGlobalContext();
    const { user } = useUser();
    useEffect(() => {
        getExpenses()
        getIncomes()
    }, [])
    const cards = [
        { icon: "call_received", title: "Total Income", money: `$${totalIncome().toFixed(2)}` },
        { icon: "call_made", title: "Total Expense", money: `$${totalExpense().toFixed(2)}` },
        { icon: "account_balance_wallet", title: "Total Balance", money: `$${totalIncome().toFixed(2) - totalExpense().toFixed(2)}` },
        { icon: "savings", title: "Savings", money: `$${totalIncome().toFixed(2) - totalExpense().toFixed(2)}` },
    ];
    return (
        <DashboardStyled>
            <div className="title-description-container">
            <h1 className="title">Welcome, <span className="highlight">{user.firstName}</span></h1>
                <h2 className="description">Keep track of your finances more efficiently!</h2>
            </div>
            <div className="card-container">
                {cards.map((card, index) => (
                    <Card key={index} icon={card.icon} title={card.title} money={card.money} />
                ))}
            </div>
            <div className="graphs">
                <div className="pie">
                    <Chart />
                </div>
                <div>
                    <PieChart />
                </div>
                
            </div>
            
            <HistoryLog
                title="Recent Activity" transactionType="all" limit={3}
            />
            
        </DashboardStyled>
 
    );
}

const DashboardStyled = styled.div`
    
    max-height: 100vh;  
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
    .highlight{
        color: #429775;
    }
    .graphs{
        display: flex;
        margin-top: 0.938rem;
        .pie{
            padding-right: 0.938rem;
        }
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
export default Dashboard