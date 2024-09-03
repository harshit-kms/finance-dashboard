import React, { useState } from "react";
import styled from "styled-components";
import FinancyLogo from "../img/FinancyLogo.svg";
import Button from "../components/button.js"
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useUser } from '../context/userContext';

const BASE_URL = "http://localhost:5050/api/";

function LogIn(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const { setUser } = useUser();
    const handleClick = (e) => {
        e.preventDefault()
        axios.post(`${BASE_URL}login`, {email, password})
        .then(result => {
            console.log(result);
            if (result.data.message === "Success") {
                setUser(result.data.user);
                navigate('/home');
            } else {
                console.log("Unexpected response:", result.data);
            }
        })
        .catch(err => {
            console.log("Error:", err);
        });
    };

    return (
        <LogInStyled>
            <div className="menu">
                <img src={FinancyLogo} alt="Financy Logo" />
                <div className="main">
                    <div className="spacing">
                        <h3>Log In</h3>
                        <h6 style={{ marginTop: '5px' }}>Welcome back! Please enter your credentials.</h6>
                    </div>
                    <div>
                        <h6>Email</h6>
                        <input 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <h6>Password</h6>
                        <input  
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button onClick={handleClick}>Log In</Button>
                        {/*<h6 style={{ marginTop: '5px' }}>
                            Don't have an account? <Link to='/register' style={{ color: '#4EBC84', fontWeight: 'bold', textDecoration: 'none' }}>Sign Up</Link>
                        </h6>
                        */}
                    </div>
                </div>
            </div>
            
        </LogInStyled>
    )
};
const LogInStyled = styled.div`
    background: #D9D9D9;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    .menu{
        width: 430px;
        height: 450px;
        border: 1px; 
        
        width: 430px;
        background: white;
        padding: 30px;
        img{
            width: 140px;
            height: auto;
        }
        .spacing{
            margin-top: 20px;
            margin-bottom: 16px;
        }
        input{
            width: 370px;
            height: 44px;
            border-radius: 8px;
            border: 1px solid #D9D9D9;
            margin-bottom: 30px;
            padding-left: 10px;
        }
        h6{
            margin-bottom: 5px;
            font-weight: normal;
        }
    }
    
    
`;
export default LogIn