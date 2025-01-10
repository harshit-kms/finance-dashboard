import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import styled from "styled-components";
import Navigation from "../src/components/navigation.js";
import Income from "../src/components/income.js";
import Expense from "../src/components/expense.js";
import Dashboard from "../src/components/dashboard.js";
import TransactionHistory from './components/transactionHistory.js';
import LogIn from '../src/components/logIn.js'
import { UserProvider } from './context/userContext';
function App() {
  const [active, setActive] = useState(1)

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />
      case 2:
        return <TransactionHistory />
      case 3:
        return <Income />
      case 4:
        return <Expense />
      default:
        return <LogIn />
    }
  }

  const Home = () => (
    <AppStyled>
      <Navigation active={active} setActive={setActive} />
      <main>
        {displayData()}
      </main>
    </AppStyled>
  );

  return (
    <UserProvider>
      <BrowserRouter>
        <AppStyled>
          <main>
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </main>
        </AppStyled>
      </BrowserRouter>
    </UserProvider>
  );
}

const AppStyled = styled.div`
  display: flex;
  height: 100vh;
  background: #F4F4F4;
  main{
    flex: 1;
    overflow: auto;
  }
`;

export default App;