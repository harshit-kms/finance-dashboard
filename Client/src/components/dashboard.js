import React, { useEffect } from "react";
import styled from "styled-components";
import Card from "../components/card.js";
import { useGlobalContext } from "../context/globalContext.js";
import Chart from "../components/chart.js";
import HistoryLog from "../components/historyLog.js";
import PieChart from "../components/pieChart.js";
import { useUser } from "../context/userContext";
function Dashboard() {
  const {
    getExpenses,
    totalExpense,
    expenses,
    getIncomes,
    totalIncome,
    incomes,
  } = useGlobalContext();
  const { user } = useUser();
  const firstName = user && user.firstName ? user.firstName : "Test";
  useEffect(() => {
    getExpenses();
    getIncomes();
  }, []);
  const cards = [
    {
      icon: "call_received",
      title: "Total Income",
      money: `$${totalIncome().toFixed(2)}`,
    },
    {
      icon: "call_made",
      title: "Total Expense",
      money: `$${totalExpense().toFixed(2)}`,
    },
    {
      icon: "account_balance_wallet",
      title: "Total Balance",
      money: `$${totalIncome().toFixed(2) - totalExpense().toFixed(2)}`,
    },
  ];
  return (
    <DashboardStyled>
      <div className="title-description-container">
        <h1 className="title">
          Welcome, <span className="highlight">{firstName}</span>
        </h1>
        <h2 className="description">
          Keep track of your finances more efficiently!
        </h2>
      </div>
      <div className="card-container">
        {cards.map((card, index) => (
          <Card
            key={index}
            icon={card.icon}
            title={card.title}
            money={card.money}
            flexBasis="calc(33.333% - 0.625rem)"
          />
        ))}
      </div>
      <div className="graphs">
        <Chart />
        <PieChart />
      </div>
      <HistoryLog title="Recent Activity" transactionType="all" limit={3} />
    </DashboardStyled>
  );
}

const DashboardStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3.313rem auto;
  max-width: 66.25rem;
  .title-description-container {
    width: 100%;
  }
  .title {
    font-size: 1.875rem;
    font-weight: 600;
    text-align: left;
  }
  .highlight {
    color: #429775;
  }
  .graphs {
    display: flex;
    margin-top: 0.938rem;
    justify-content: space-between;
    gap: 0.938rem;
    width: 100%;
    @media (max-width: 1100px) {
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow-x: auto;
    }
  }
  .description {
    font-size: 1rem;
    font-weight: 400;
    color: #4b4b4b;
    margin-bottom: 0.938rem;
    text-align: left;
  }
  .card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 0.938rem;
    width: 100%;
  }
  @media (max-width: 1400px) {
    max-width: 51rem;
    padding: 0 1.875rem;
  }
`;
export default Dashboard;
