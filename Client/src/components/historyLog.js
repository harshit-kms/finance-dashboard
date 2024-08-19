import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../context/globalContext.js";
import TransactionInput from './transactionInput';
import { dateFormat } from '../utils/dateFormat';
import { salary, freelance, investments, stocks, bitcoin, banktransfer, other} from "../utils/Icons"; 

function HistoryLog({ 
    id,
    title,
    amount,
    date,
    category,
    deleteItem,
    transactionType
}) {

    const { incomes, expenses } = useGlobalContext();

    let transactions = [];
    if (transactionType === 'all') {
        transactions = [...(Array.isArray(incomes) ? incomes : []), ...(Array.isArray(expenses) ? expenses : [])];
        transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (transactionType === 'income') {
        transactions = Array.isArray(incomes) ? incomes : [];
    } else {
        transactions = Array.isArray(expenses) ? expenses : [];
    }
    const getCategoryIcon = (category) => {
        switch (category) {
            case 'Salary':
                return salary;
            case 'Freelance':
                return freelance;
            case 'Investments':
                return investments;
            case 'Stocks':
                return stocks;
            case 'Bitcoin':
                return bitcoin;
            case 'Bank Transfer':
                return banktransfer;
            default:
                return other; // Default icon if none of the categories match
        }
    };
    return (
        <HistoryLogStyled>
            <div className="header">
                <h2 className="log-title">{title}</h2>
                {transactionType !== 'all' && <TransactionInput transactionType={transactionType} />}
            </div>
            <div className="labels">
                <div className="name-label"><p>Name</p></div>
                <div className="amount-label"><p>Amount</p></div>
                <div className="date-label"><p>Date</p></div>
                <div className="category-label"><p>Category</p></div>
                {transactionType === 'all' && <div className="type-label"><p>Type</p></div>}
            </div>
            {transactions.length === 0 ? (
                <div className="no-transaction">
                    <p>No Transactions</p>
                </div>
            ) : (
                transactions.map((transaction,  _id, title, amount, date, category, type ) => (
                    <div className="transaction" key={transaction._id}>
                        <div className="name">
                            <div className="name-icon-bg">
                                <NameIcon className="material-symbols-outlined">
                                    {getCategoryIcon(transaction.category)}
                                </NameIcon>
                            </div>
                            <p>{transaction.title}</p>
                        </div>
                        <div className="amount"><p>${transaction.amount}</p></div>
                        <div className="date"><p>{dateFormat(transaction.date)}</p></div>
                        <div className="category">
                            <div className="category-box"><p>{transaction.category}</p></div>
                            <DeleteButton className="material-symbols-outlined">call_received</DeleteButton>
                        </div>
                        <div>
                        <SubmitButton onClick={() => {
                            console.log('Button clicked with id:', transactions._id);
                            deleteItem(transaction._id);
                        }} title="Delete">
                            {trash}
                    </SubmitButton>
                        </div>
                        {transactionType === 'all' && (
                            <div className="type">
                                <p>{transaction.type}</p>
                            </div>
                        )}
                    </div>
                ))
            )}
            
        </HistoryLogStyled>
    );
};


const HistoryLogStyled = styled.div`
    margin-top: 0.938rem;
    padding-top: 0.938rem;
    padding-left: 1.125rem;
    padding-right: 1.125rem;
    padding-bottom: 0.938rem;
    background: #FFFFFF;
    border-radius: 8px;
    align-items: center;
    .header{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .log-title{
        font-size: 1.25rem;
        font-weight: 600;
    }
    .labels{
        font-size: 1rem;
        font-weight: 400;
        color: #4B4B4B;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-top: 0.938rem;
        margin-bottom: 0.938rem;
        .name-label{
            margin-right: 19.688rem;
        }
        .amount-label{
            margin-right: 8.688rem;
        }
        .date-label{
            margin-right: 14rem;
        }
        .category-label{
            margin-right: 8.75rem;
        }
    }
    .transaction{
        font-size: 1rem;
        font-weight: 400;
        border-width: 1px 0px 0px 0px;
        border-style: solid;
        border-color: #D9D9D9;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding-top: 0.938rem;
        padding-bottom: 0.938rem;
        .name{
            width: 22.5rem;
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 0.0.625rem;
            .name-icon-bg{
                width: 2.5rem;
                height: 2.5rem;
                border-radius: 100%;
                background: #B5E1C8;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
        .amount{
            width: 12.5rem;
        }
        .date{
            width: 16.25rem;
        }
        .category{
            width: 13.125rem;
            display: flex;
            align-items: center;
            justify-content: left;
            .category-box{
                white-space: nowrap;
                width: 100%
                height: 100%;
                padding-top: 0.25rem;
                padding-bottom: 0.25rem;
                padding-right: 0.625rem;
                padding-left: 0.625rem;
                border-radius: 8px;
                background: #B5E1C8;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }
`;

const NameIcon = styled.div`
    color: #354F52;
    .material-symbols-outlined {
        font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24
    }
`;

// const FilterModal = styled.div`
//     background-color: #FFFFFF;
//     padding: 1.25rem 1.25rem 1.25rem 1.25rem;
//     border-radius: 8px;
//     display: flex;
//     flex-direction: column;
//     gap: 1.25rem;    
// `;

export default HistoryLog;