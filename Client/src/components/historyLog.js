import React, { useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../context/globalContext.js";
function HistoryLog({ title, name_icon, name, amount, date, category }){
    const [isIncomeModalOpen, setIncomeModalOpen] = useState(false);
    const [isFilterModalOpen, setFilterModalOpen] = useState(false);

    const openIncomeModal = () => setIncomeModalOpen(true);
    const closeIncomeModal = () => setIncomeModalOpen(false);

    const openFilterModal = () => setFilterModalOpen(true);
    const closeFilterModal = () => setFilterModalOpen(false);

    const {addIncome} = useGlobalContext()

    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
    })
    const { title: inputTitle, amount: inputAmount, date: inputDate, category: inputCategory } = inputState
    
    const handleInput = name => e => {
        setInputState({...inputState, [name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        addIncome(inputState)
        setInputState({
            title: '',
            amount: '',
            date: '',
            category: '',
        })
    }
    return (
        <HistoryLogStyled onSubmit={handleSubmit}>
            <div className="header">
                <div className="log-title">
                    <p>{title}</p>
                </div>
                <div className="buttons">
                    <button className="button" onClick={openIncomeModal}>
                        <ButtonIcon className="material-symbols-outlined" >add</ButtonIcon>
                        <p >Add Income</p>
                    </button>
                    <button className="button" onClick={openFilterModal}>
                        <ButtonIcon className="material-symbols-outlined">filter_list</ButtonIcon>
                        <p>Apply Filter</p>
                    </button>
                    {isIncomeModalOpen && (
                        <>
                            <ModalBackground onClick={closeIncomeModal} />
                            <IncomeModal>
                                <div className="modal-header">
                                    <button className="button" onClick={closeIncomeModal} style={{ border: "0px" }}>
                                        <ButtonIcon className="material-symbols-outlined">close</ButtonIcon>
                                    </button>
                                    <div className="modal-title">
                                        <p>Add Income</p>
                                    </div>
                                </div>
                                <div className="modal-body">
                                    <div className="input">
                                        <p className="text">Title</p>
                                        <input className="input-box" 
                                            type="text" 
                                            value={inputTitle}
                                            name={'title'}
                                            onChange={handleInput('title')}
                                        />
                                    </div>
                                    <div className="input">
                                        <p className="text">Amount</p>
                                        <input className="input-box" 
                                            type="number" 
                                            value={inputAmount}
                                            name={'amount'}
                                            onChange={handleInput('amount')}
                                        />
                                    </div>
                                    <div className="input">
                                        <p className="text">Date</p>
                                        <input className="input-box" 
                                            type="date"
                                            value={inputDate}
                                            name={'date'}
                                            onChange={(event) => {
                                                setInputState({...inputState, date: event.target.value})
                                            }}
                                        />
                                    </div>
                                    <div className="selects input">
                                        <p className="text">Category</p>
                                        <select required className="input-box" type="text" value={inputCategory} name="category" placeholder="Select Category" onChange={handleInput('category')}>
                                            <option value="" disabled>Select Category</option>
                                            <option value="salary">Salary</option>
                                            <option value="freelance">Freelance</option>
                                            <option value="investments">Investments</option>
                                            <option value="stocks">Stocks</option>
                                            <option value="bitcoin">Bitcoin</option>
                                            <option value="banktransfer">Bank Transfer</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button className="green-button">Add Income</button>
                                </div>
                            </IncomeModal>
                        </>
                    )}
                    {isFilterModalOpen && (
                        <>
                            <ModalBackground onClick={closeFilterModal} />
                            <FilterModal>
                                <h2>Filter</h2>
                                <button onClick={closeFilterModal}>Close</button>
                            </FilterModal>
                        </>
                    )}
                </div>
            </div>
            <div className="labels">
                <div className="name-label">
                    <p>Name</p>
                </div>
                <div className="amount-label">
                    <p>Amount</p>
                </div>
                <div className="date-label">
                    <p>Date</p>
                </div>
                <div className="category-label">
                    <p>Category</p>
                </div>
            </div>
            <div className="transaction">
                <div className="name">
                    <div className="name-icon-bg">
                        <NameIcon className="material-symbols-outlined">{name_icon}</NameIcon>
                    </div>
                    <p>{name}</p>
                </div>
                <div className="amount">
                    <p>{amount}</p>
                </div>
                <div className="date">
                    <p>{date}</p>
                </div>
                <div className="category">
                    <div className="category-box">
                        <p>{category}</p>
                    </div>
                </div>
            </div>
        </HistoryLogStyled >
    );
}

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
    .buttons{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 0.938rem;
        .button{
            font-size: 1rem;
            font-weight: 500;
            border: 1px solid #D9D9D9;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 0.625rem;
            color: #4B4B4B;
            background: none;
            border-radius: 8px;
            padding-left: 0.625rem;
            padding-right: 0.625rem;
            padding-top: 0.375rem;
            padding-bottom: 0.375rem;
        }
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

const ButtonIcon = styled.div`
    color: #354F52;
    .material-symbols-outlined {
        font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24
    }
`;

const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;    
`;

const IncomeModal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 25rem;
    padding-left: 0.938rem;
    padding-top: 0.938rem;
    padding-right: 0.938rem;
    background-color: #FFFFFF;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    z-index: 1000;
    .modal-header {
        display: flex;
        flex-direction: row;
        width: 100%;
        border-bottom: 1px solid #D9D9D9;
        padding-bottom: 0.938rem;
        .modal-title {
            font-size: 1.25rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-grow: 1; /* Makes the title take up available space */
        }

        .modal-close {
            display: flex;
            align-items: center;
            justify-content: center;
            color: #354F52;
            font-size: 1.25rem;
            cursor: pointer;
            transition: all 0.4s ease-in-out;

            &:hover {
                color: #6cc392;
            }
        }
    }
    .modal-body {
        padding-top: 1.875rem;
        padding-bottom: 1.875rem;
        display: flex;
        flex-direction: column;
        gap: 0.938rem;
        border-bottom: 1px solid #D9D9D9;
        .input{
            display: flex;
            flex-direction: column;
            gap: 0.375rem;
            .text{
                font-size: 0.875rem;
                color: #4B4B4B;
                font-weight: 500;
            }
            .input-box{
                width: 100%;
                height: 2.75rem;
                border-radius: 8px;
                border: 1px solid #D9D9D9;
                padding: 0.625rem;
            }
        }
    }
    .modal-footer {
        padding-top: 0.938rem;
        padding-bottom: 1rem;
        display: flex;
        justify-content: center;
    }
    .green-button{
        background-color: #4EBC84;
        color: #FFFFFF;
        height: 2.75rem;
        padding-left: 1.25rem;
        padding-right: 1.25rem;
        font-size: 1rem;
        font-weight: 500;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        transition: all 0.4s ease-in-out;
    }
`;

const FilterModal = styled.div`
    background-color: #FFFFFF;
    padding: 1.25rem 1.25rem 1.25rem 1.25rem;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;    
`;

export default HistoryLog;