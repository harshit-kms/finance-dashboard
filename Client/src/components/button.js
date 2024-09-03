import React from 'react';
import styled from "styled-components";

const Button = ({ onClick, children }) => {
    return (
        <StyledButton onClick={onClick}>
            {children}
        </StyledButton>
    );
};

const StyledButton = styled.button`
    color: white;
    background-color: #4EBC84;
    width: 370px;
    height: 44px;
    border: none;
    border-radius: 8px;

`;
export default Button;