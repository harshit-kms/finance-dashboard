import React from "react";
import styled from "styled-components";
const Card = ({ icon, title, money }) => {
    return (
        <CardStyled>
            <div className="icon-bg">
                <Icon className="material-symbols-rounded">{icon}</Icon>
            </div>
            <div>
                <p className="card-title">{title}</p>
                <p className="money">{money}</p>
            </div>
        </CardStyled>
    );
}

const CardStyled = styled.div`
    background: #FFFFFF;
    // box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    width: 15.856rem;
    height: 6.25rem;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    padding: 0 0.938rem;
    .card-title{
        font-size: 1.25rem;
        font-weight: 500;
        margin-left: 1.125rem;
    }
    .money{
        font-size: 1.5rem;
        font-weight: 600;
        margin-left: 1.125rem;
    }
    .icon-bg{
        background: #D9D9D9;
        min-width: 3rem;
        height: 3rem;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    @media (max-width: 1439px) {
        width: calc(50% - 0.469rem); // 2x2 layout
    }

    @media (max-width: 895px) {
        width: 100%; // 1x4 layout
    }
`;

const Icon = styled.i`
    color: #4B4B4B;
    .material-symbols-rounded {
        font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24
    }
`;

export default Card;