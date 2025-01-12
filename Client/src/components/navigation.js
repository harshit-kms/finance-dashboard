import React, { useState } from "react";
import styled from "styled-components";
import FinancyLogo from "../img/FinancyLogo.svg";
import exampleProfile from "../img/exampleProfile.jpeg";
import Icons from "../utils/Icons";
import { navItems } from "../utils/navItems";
import { useUser } from "../context/userContext";
import { Link } from "react-router-dom";

function Navigation({ active, setActive }) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const firstName = user ? user.firstName : "Test";
  const lastName = user ? user.lastName : "User";

  return (
    <>
      <MenuButton
        onClick={() => setIsOpen(!isOpen)}
        className={isOpen ? "open" : ""}
      >
        <span></span>
        <span></span>
        <span></span>
      </MenuButton>

      <NavStyled className={isOpen ? "open" : ""}>
        <img src={FinancyLogo} alt="Financy Logo" />
        <ul className="navitems">
          {navItems.map((item) => {
            return (
              <li
                key={item.id}
                onClick={() => {
                  setIsOpen(false);
                  setTimeout(() => {
                    setActive(item.id);
                  }, 200);
                }}
                className={active === item.id ? "active" : ""}
              >
                {item.icon}
                <span>{item.title}</span>
              </li>
            );
          })}
        </ul>
        <div className="user-profile">
          <img src={exampleProfile} alt="Profile" />
          <div className="text">
            <h2>
              {firstName} {lastName}
            </h2>
          </div>
          <Link className="icon" to="/login">
            {Icons.signup}
          </Link>
        </div>
      </NavStyled>
      {isOpen && <Overlay onClick={() => setIsOpen(!isOpen)} />}
    </>
  );
}

const MenuButton = styled.button`
  display: none;
  flex-direction: column;
  justify-content: space-around;
  height: 1.25rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1000;

  span {
    width: 1.25rem;
    height: 0.17rem;
    background: #4b4b4b;
    border-radius: 0.625rem;
    transition: all 0.2s linear;
    position: relative;
    transform-origin: 1px;
  }

  @media (max-width: 720px) {
    display: flex;
  }

  &.open {
    span:first-child {
      transform: rotate(45deg);
    }
    span:nth-child(2) {
      opacity: 0;
    }
    span:nth-child(3) {
      transform: rotate(-45deg);
    }
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: none;
  z-index: 998;

  @media (max-width: 720px) {
    display: block;
  }
`;

const NavStyled = styled.nav`
  display: flex;
  background: #ffffff;
  height: 100vh;
  width: 16rem;
  border-width: 0px 1px 0px 0px;
  border-style: solid;
  border-color: #d9d9d9;
  flex-direction: column;
  padding: 3.313rem 1.25rem;
  img {
    width: 8.8rem;
    height: 2rem;
  }
  .navitems {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-top: 1rem;
    li {
      display: grid;
      grid-template-columns: 40px auto;
      align-items: center;
      margin: 0.6rem 0;
      font-weight: 500;
      cursor: pointer;
      position: relative;
      padding-left: 0.625rem;
      span {
        font-size: 1rem;
      }
    }
    .active {
      height: 38px;
      width: 100%;
      border-radius: 0.438rem;
      background-color: #6cc392;
      cursor: pointer;
      color: #ffffff;
      padding-left: 0.625rem;
      transition: background-color 0.2s, color 0.2s;
    }
  }
  .user-profile {
    display: flex;
    align-items: center;
    padding: 0.2rem;
    margin-top: auto;
    margin-bottom: -2.5rem;
    img {
      width: 3.75rem;
      height: 3.75rem;
      border-radius: 50%;
      object-fit: cover;
      background: #d9d9d9;
      padding: 0.2rem;
      margin-right: 0.5rem;
    }
    h2 {
      font-size: 1.25rem;
      font-weight: 500;
      margin-right: 0.5rem;
      margin-bottom: 0.3rem;
    }
    p {
      font-size: 16px;
    }
  }
  .icon {
    cursor: "pointer";
    color: black;
  }
  .icon:hover {
    color: #6cc392;
  }
  .icon:active {
    color: #6cc392;
  }
  @media (max-width: 720px) {
    position: fixed;
    top: 0;
    left: -100%;
    z-index: 999;
    transition: left 0.3s ease-in-out;

    &.open {
      left: 0;
    }
`;

export default Navigation;
