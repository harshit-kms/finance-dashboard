import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../context/globalContext.js";
import TransactionInput from './transactionInput';
import { dateFormat } from '../utils/dateFormat';
import Icons from '../utils/Icons';
import { formatNumber } from "../utils/amountFormat";

function HistoryLog({ title, transactionType, limit }) {

    const { incomes, expenses, deleteIncome, deleteExpense } = useGlobalContext();

    let transactions = [];
    if (transactionType === 'all') {
        transactions = [...(Array.isArray(incomes) ? incomes : []), ...(Array.isArray(expenses) ? expenses : [])];
        transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
        transactions = transactions.slice(0, limit);
    } else if (transactionType === 'income') {
        transactions = Array.isArray(incomes) ? incomes : [];
    } else {
        transactions = Array.isArray(expenses) ? expenses : [];
    }
    const getCategoryDetails = (category) => {
        switch (category) {
            case 'Salary':
                return { background: '#B5E1C8', icon: '#2D6A4F', iconComponent: Icons.salary };
            case 'Freelance':
                return { background: '#C7E9B0', icon: '#3F6212', iconComponent: Icons.freelance };
            case 'Investments':
                return { background: '#A7F3D0', icon: '#065F46', iconComponent: Icons.investments };
            case 'Stocks':
                return { background: '#BAE6FD', icon: '#0369A1', iconComponent: Icons.stocks };
            case 'Bitcoin':
                return { background: '#FDE68A', icon: '#92400E', iconComponent: Icons.bitcoin };
            case 'Bank Transfer':
                return { background: '#E9D5FF', icon: '#6B21A8', iconComponent: Icons.bank_transfer };
            case 'Education':
                return { background: '#AFD3E9', icon: '#1B4965', iconComponent: Icons.education };
            case 'Groceries':
                return { background: '#B5CFBB', icon: '#354F52', iconComponent: Icons.groceries };
            case 'Health':
                return { background: '#FFBCBE', icon: '#C81D25', iconComponent: Icons.health };
            case 'Subscriptions':
                return { background: '#D3C3E7', icon: '#543C91', iconComponent: Icons.subscriptions };
            case 'Food':
                return { background: '#FBCBAE', icon: '#DC2F02', iconComponent: Icons.food };
            case 'Shopping':
                return { background: '#FAF7B6', icon: '#7A653B', iconComponent: Icons.shopping };
            case 'Traveling':
                return { background: '#BDE6EE', icon: '#057874', iconComponent: Icons.traveling };
            default:
                return { background: '#E8E8E8', icon: '#7A7A7A', iconComponent: Icons.other };
        }
    };

    return (
        <HistoryLogStyled>
            <div className="header">
                <h2 className="log-title">{title}</h2>
                {transactionType !== 'all' && <TransactionInput transactionType={transactionType} />}
            </div>
            <div className="transactions-grid labels">
                <div><p>Name</p></div>
                <div><p>Amount</p></div>
                <div><p>Date</p></div>
                <div><p>Category</p></div>
                <div></div>
            </div>
            {transactions.length === 0 ? (
                <div className="no-transactions">
                    <p>No Transactions</p>
                </div>
            ) : (
                transactions.map((transaction) => {
                    const { background, icon, iconComponent } = getCategoryDetails(transaction.category);
                    return (
                        <div className="transactions-grid transactions" key={transaction._id}>
                            <div className="name">
                                <div className="name-icon-bg" style={{ background: background }}>
                                    <NameIcon className="material-symbols-outlined" color={icon}>
                                        {iconComponent}
                                    </NameIcon>
                                </div>
                                <p>{transaction.title}</p>
                            </div>
                            <div>
                                <p style={{ color: (transaction.type === 'income' ? '#429775' : '#D72B2B') }}>
                                    {(transaction.type === 'income' ? '+ ' : '- ')}
                                    ${formatNumber(transaction.amount)}
                                </p>
                            </div>
                            <div><p>{dateFormat(transaction.date)}</p></div>
                            <div>
                                <CategoryBox color={background}>
                                    <p>{transaction.category}</p>
                                </CategoryBox>
                            </div>
                            <DeleteButton onClick={() => {
                                if (transaction.type === 'income') {
                                    deleteIncome(transaction._id);
                                }
                                else {
                                    deleteExpense(transaction._id);
                                }
                            }} title="Delete">
                                {Icons.trash}
                            </DeleteButton>
                        </div>
                    );
                })
            )}
        </HistoryLogStyled>
    );
};

const HistoryLogStyled = styled.div`
    margin: 0.938rem 0;
    min-width: 10rem;
    width:100%;
    padding: 0.938rem 1.125rem;
    background: #FFFFFF;
    border-radius: 8px;
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
    .transactions-grid{
        display: grid;
        grid-template-columns: minmax(0, 1.8fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, .7fr);
        gap: 2rem;
        align-items: center;
        &.labels{
            font-size: 1rem;
            font-weight: 400;
            color: #4B4B4B;
            padding: 0.938rem 0;
        }
        &.transactions{
            font-size: 1rem;
            font-weight: 400;
            border-width: 1px 0px 0px 0px;
            border-style: solid;
            border-color: #D9D9D9;
            padding: 0.938rem 0;
            .name{
                display: flex;
                flex-direction: row;
                align-items: center;
                gap: 0.625rem;
                .name-icon-bg{
                    min-width: 2.5rem;
                    height: 2.5rem;
                    border-radius: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
        }
    }
    .no-transactions{
        font-size: 1rem;
        font-weight: 400;
        color: #4B4B4B;
    }
    @media (max-width: 895px) {
        .header {
            padding-bottom: 0.938rem;
            gap: 1rem;
        }

        .transactions-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-areas: 
                "name name"
                "amount date"
                "category action";
            gap: 0.938rem;

            &.labels {
                display: none;
            }
            &.transactions {
                .name {
                    grid-area: name;
                }
                .amount {
                    grid-area: amount;
                }
                .date {
                    grid-area: date;
                    justify-self: end;
                    text-align: right;
                    display: flex;
                    justify-content: end;
                }
                .category {
                    grid-area: category;
                }
                .action {
                    grid-area action
                    justify-self: center;
                    margin-top: 0.5rem;
                }
                .amount::before,
                .date::before,
                .category::before {
                    content: attr(data-label);
                    display: block;
                    font-weight: bold;
                    font-size: 0.8em;
                    margin-bottom: 0.2em;
                }
            }
        }
`;

const CategoryBox = styled.div`
    display: inline-block;
    padding: 0.25rem 0.625rem;
    border-radius: 8px;
    background: ${props => props.color};
    white-space: nowrap;
`;

const NameIcon = styled.div`
    color: ${props => props.color};
    .material-symbols-outlined {
        font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24
    }
`;
const DeleteButton = styled.button`
    display: flex;
    justify-content: end;
    cursor: pointer;
    border: none;
    background: transparent;
    transition: all 0.4s ease-in-out;
`;

export default HistoryLog;