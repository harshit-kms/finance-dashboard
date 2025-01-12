import React, { useEffect } from "react";
import styled from "styled-components";
import HistoryLog from "../components/historyLog.js";
import { useGlobalContext } from "../context/globalContext.js";

function TransactionHistory() {
  const { getIncomes, getExpenses } = useGlobalContext();

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);

  return (
    <TransactionHistoryStyled>
      <div className="title-description-container">
        <h1 className="title">Transactions</h1>
        <h2 className="description">
          View and manage your entire transaction history.
        </h2>
      </div>
      <HistoryLog title="Transaction History" transactionType="all" />
    </TransactionHistoryStyled>
  );
}

const TransactionHistoryStyled = styled.div`
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
  .description {
    font-size: 1rem;
    font-weight: 400;
    color: #4b4b4b;
    text-align: left;
  }
  @media (max-width: 1400px) {
    max-width: 50rem;
    padding: 0 1.875rem;
  }
`;

export default TransactionHistory;
