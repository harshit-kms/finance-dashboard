import React, { useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../context/globalContext';

const TransactionInput = ({ transactionType }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { addIncome, addExpense } = useGlobalContext();

    // const [isFilterModalOpen, setFilterModalOpen] = useState(false);


    // const openFilterModal = () => setFilterModalOpen(true);
    // const closeFilterModal = () => setFilterModalOpen(false);

    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
    });

    const { title: inputTitle, amount: inputAmount, date: inputDate, category: inputCategory } = inputState;

    const handleInput = name => e => {
        setInputState({ ...inputState, [name]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (transactionType === 'income') {
            addIncome(inputState);
        } else if (transactionType === 'expense') {
            addExpense(inputState);
        }
        setInputState({
            title: '',
            amount: '',
            date: '',
            category: '',
        });
        setIsModalOpen(false);
    };

    return (
        <>
            <Button onClick={() => setIsModalOpen(true)}>
                <ButtonIcon className="material-symbols-outlined">add</ButtonIcon>
                <p>Add {transactionType === 'income' ? 'Income' : 'Expense'}</p>
            </Button>
            {isModalOpen && (
                <>
                    <ModalBackground onClick={() => setIsModalOpen(false)} />
                    <Modal>
                        <div className="modal-header">
                            <button className="close-button" onClick={() => setIsModalOpen(false)}>
                                <ButtonIcon className="material-symbols-outlined">close</ButtonIcon>
                            </button>
                            <div className="modal-title">
                                <p>Add {transactionType === 'income' ? 'Income' : 'Expense'}</p>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <InputField>
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        value={inputTitle}
                                        name="title"
                                        onChange={handleInput('title')}
                                        required
                                    />
                                </InputField>
                                <InputField>
                                    <label>Amount</label>
                                    <input
                                        type="number"
                                        value={inputAmount}
                                        name="amount"
                                        onChange={handleInput('amount')}
                                        required
                                    />
                                </InputField>
                                <InputField>
                                    <label>Date</label>
                                    <input
                                        type="date"
                                        value={inputDate}
                                        name="date"
                                        onChange={handleInput('date')}
                                        required
                                    />
                                </InputField>
                                <InputField>
                                    <label>Category</label>
                                    <select
                                        value={inputCategory}
                                        name="category"
                                        onChange={handleInput('category')}
                                        required
                                    >
                                        <option value="" disabled>Select Category</option>
                                        {transactionType === 'income' ? (
                                            <>
                                                <option value="salary">Salary</option>
                                                <option value="freelance">Freelance</option>
                                                <option value="investments">Investments</option>
                                                <option value="stocks">Stocks</option>
                                                <option value="bitcoin">Bitcoin</option>
                                                <option value="banktransfer">Bank Transfer</option>
                                                <option value="other">Other</option>
                                            </>
                                        ) : (
                                            <>
                                                <option value="education">Education</option>
                                                <option value="groceries">Groceries</option>
                                                <option value="health">Health</option>
                                                <option value="subscriptions">Subscriptions</option>
                                                <option value="restaurants">Restaurants</option>
                                                <option value="shopping">Shopping</option>
                                                <option value="traveling">Traveling</option>
                                            </>
                                        )}
                                    </select>
                                </InputField>
                            </div>
                            <div className="modal-footer">
                                <SubmitButton type="submit">Add {transactionType === 'income' ? 'Income' : 'Expense'}</SubmitButton>
                            </div>
                        </form>
                    </Modal>
                </>
            )}
        </>
    );
};

const Button = styled.button`
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

const Modal = styled.div`
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
    .modal-footer {
        padding-top: 0.938rem;
        padding-bottom: 1rem;
        display: flex;
        justify-content: center;
    }
`;

const InputField = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
        input{
            width: 100%;
            height: 2.75rem;
            border-radius: 8px;
            border: 1px solid #D9D9D9;
            padding: 0.625rem;
        }
        select{
            width: 100%;
            height: 2.75rem;
            border-radius: 8px;
            border: 1px solid #D9D9D9;
            padding: 0.625rem;
        }
`;

const SubmitButton = styled.button`
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
`;

export default TransactionInput;