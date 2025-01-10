import React from "react"
import styled from "styled-components";
import FinancyLogo from "../img/FinancyLogo.svg";
import exampleProfile from "../img/exampleProfile.jpeg";
import Icons from "../utils/Icons";
import { navItems } from "../utils/navItems"
import { useUser } from '../context/userContext';
import { Link } from 'react-router-dom';
function Navigation({ active, setActive }) {
    
    const { user } = useUser();
    const firstName = user ? user.firstName : "Test";
    const lastName = user ? user.lastName : "User";

    return (
        <NavStyled>
            <img src={FinancyLogo} alt="Financy Logo" />
            <ul className="navitems">
                {navItems.map((item) => {
                    return <li
                        key={item.id}
                        onClick={() => setActive(item.id)}
                        className={active === item.id ? 'active' : ''}
                    >
                        {item.icon}
                        <span>{item.title}</span>
                    </li>
                })}
            </ul>
            <div className="user-profile">
                <img src={exampleProfile} alt="Profile" />
                <div className="text">
                    <h2>{firstName} {lastName}</h2>
                </div>
                <Link className="icon" to="/login">
                    {Icons.signup}
                </Link>
            </div>
        </NavStyled>
    );
}

const NavStyled = styled.nav`
    display: flex;
    background: #FFFFFF;
    height: 100vh;
    width: 18rem;
    border-width: 0px 1px 0px 0px;
    border-style: solid;
    border-color: #D9D9D9;
    flex-direction: column;
    padding: 3.313rem 1.25rem;
    img{
        width: 8.8rem;
        height: 2rem;
    }
    .navitems{
        display: flex;
        flex-direction: column;
        flex: 1;
        margin-top: 1rem;
        li{
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: .6rem 0;
            font-weight: 500;
            cursor: pointer;
            position: relative;
            padding-left: 0.625rem;
            span{
                font-size: 1rem;
            }
        }
        .active{
            height: 38px;
            width: 100%;
            border-radius: 0.438rem;             
            background-color: #6CC392;
            cursor: pointer;               
            color: #FFFFFF;
            padding-left: 0.625rem;
            transition: background-color 0.2s, color 0.2s;
        }
    }
    .user-profile{
        display: flex;
        align-items: center;
        padding: .2rem;
        margin-top: auto;
        margin-bottom: -2.5rem;
        img{
            width: 3.75rem;
            height: 3.75rem;
            border-radius: 50%;
            object-fit: cover;
            background: #D9D9D9;
            padding: .2rem;
            margin-right: .5rem;
        }
        h2{
            font-size: 1.25rem;
            font-weight: 500;
            margin-right: .5rem;
            margin-bottom: .3rem;
        }
        p{
            font-size: 16px;
        }
    }
    .icon{
        cursor: 'pointer';
        color: black;
    }
    .icon:hover {
        color: #6CC392;
    }
    .icon:active {
        color: #6CC392;
    }
    @media (max-width: 600px) {
        display: none;
    }
`;

export default Navigation;