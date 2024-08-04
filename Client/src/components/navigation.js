import React from "react"
import styled from "styled-components";
import FinancyLogo from "../img/FinancyLogo.svg";
import exampleProfile from "../img/exampleProfile.jpeg";
import { signup } from "../utils/Icons"; 
import { navItems } from "../utils/navItems"
function Navigation({active, setActive}) {
    return (
      <NavStyled>
        <img src={FinancyLogo} alt="Financy Logo" />
        <ul className="navitems">
            {navItems.map((item) => {
                    return <li
                        key={item.id}
                        onClick={() => setActive(item.id)}
                        className={active === item.id ? 'active': ''}
                    >
                        {item.icon}
                        <span>{item.title}</span>
                    </li>
            })}
        </ul>
        <div className="user-profile">
            <img src={exampleProfile} alt="Profile" />
            <div className="text">
                <h2>First Last</h2>
                <p>Current Role</p>
            </div>
            {signup} 
        </div>
      </NavStyled>
    );
  }
  
const NavStyled = styled.nav`
    background: #FFFFFF;
    height: 100%;
    width: 20rem;
    border-width: 0px 1px 0px 0px;
    border-style: solid;
    border-color: #D9D9D9;
    padding: 53px 10px 53px 10px;
    img{
        width: 11.5rem;
        height: 2rem;
    }
    .navitems{
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-top: 1rem;
        li{
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: .6rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all .4s ease-in-out;
            padding-left: 2rem;
            position: relative;
            span{
                font-size: 1rem;
            }
            i{
                font-size: 1.125rem;
            }
        }
        .active{
            height: 38px;
            width: 260px;
            border-radius: 7px;             
            background-color: #6CC392;
            cursor: pointer;               
            color: #FFFFFF;
            i{
                color: #FFFFFF;
            }
            &::before{
                content: "";
                position: absolute;
                width: 4px;
                height: 100%;
                background: #6CC392;
                
            }
        }
    }
    .user-profile{
        display: flex;
        align-items: center;
        padding: .2rem;
        margin-top: 27.5rem;
        img{
            width: 60px;
            height: 60px;
            border-radius: 50%;
            object-fit: cover;
            background: #D9D9D9;
            padding: .2rem;
            margin-right: .5rem;
        }
        h2{
            font-size: 20px;
            font-weight: 500;
            margin-right: 1rem;
        }
        p{
            font-size: 16px;
        }
    }
`;
  
export default Navigation;

