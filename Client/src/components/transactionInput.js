import React, { useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../context/globalContext';
import { formatNumber } from '../utils/amountFormat';

const TransactionInput = ({ transactionType }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { addIncome, addExpense } = useGlobalContext();
    const [error, setError] = useState('');
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
    });

    const { title: inputTitle, amount: inputAmount, date: inputDate, category: inputCategory } = inputState;

    const handleInput = name => e => {
        let value = e.target.value;
        if (name === 'amount') {
            if (!/^[\d,]*\.?\d{0,2}$/.test(value)) {
                setError('Please enter a valid amount with up to two decimal places.');
            } else {
                setError('');
            }
        }
        setInputState({ ...inputState, [name]: value });
    }


    const handleSubmit = e => {
        e.preventDefault();
        const formattedAmount = formatNumber(inputAmount);
        const updatedInputState = {
            ...inputState,
            amount: formattedAmount
        };
        if (transactionType === 'income') {
            addIncome(updatedInputState);
        } else if (transactionType === 'expense') {
            addExpense(updatedInputState);
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
                                    <h3>Title</h3>
                                    <input
                                        type="text"
                                        value={inputTitle}
                                        name="title"
                                        placeholder="Title"
                                        onChange={handleInput('title')}
                                        required
                                    />
                                </InputField>
                                <InputField>
                                    <h3>Amount</h3>
                                    <input
                                        type="text"
                                        value={inputAmount}
                                        name="amount"
                                        placeholder="0.00"
                                        onChange={handleInput('amount')}
                                        required
                                    />
                                    {error && <ErrorMessage>{error}</ErrorMessage>}
                                </InputField>
                                <InputField>
                                    <h3>Date</h3>
                                    <input
                                        type="date"
                                        value={inputDate}
                                        name="date"
                                        onChange={handleInput('date')}
                                        required
                                    />
                                </InputField>
                                <InputField>
                                    <h3>Category</h3>
                                    <select
                                        value={inputCategory}
                                        name="category"
                                        onChange={handleInput('category')}
                                        required
                                    >
                                        <option value="" disabled>Select Category</option>
                                        {transactionType === 'income' ? (
                                            <>
                                                <option value="Salary">Salary</option>
                                                <option value="Freelance">Freelance</option>
                                                <option value="Investments">Investments</option>
                                                <option value="Stocks">Stocks</option>
                                                <option value="Bitcoin">Bitcoin</option>
                                                <option value="Bank Transfer">Bank Transfer</option>
                                                <option value="Other">Other</option>
                                            </>
                                        ) : (
                                            <>
                                                <option value="Education">Education</option>
                                                <option value="Groceries">Groceries</option>
                                                <option value="Health">Health</option>
                                                <option value="Subscriptions">Subscriptions</option>
                                                <option value="Food">Food</option>
                                                <option value="Shopping">Shopping</option>
                                                <option value="Traveling">Traveling</option>
                                                <option value="Other">Other</option>
                                            </>
                                        )}
                                    </select>
                                </InputField>
                            </div>
                            <div className="modal-footer">
                                <SubmitButton type="submit" disabled={!!error}>Add {transactionType === 'income' ? 'Income' : 'Expense'}</SubmitButton>
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
    p {
        text-align: left;
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

const ErrorMessage = styled.div`
    color: red;
    font-size: 1rem;
`;

export default TransactionInput;