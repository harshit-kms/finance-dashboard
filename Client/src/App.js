import React, { useState } from 'react'
import styled from "styled-components";
import Navigation from "../src/components/navigation.js";
import Income from "../src/components/income.js";
import Expense from "../src/components/expense.js";
import Dashboard from "../src/components/dashboard.js";
function App() {
  const [active, setActive] = useState(1)

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />
      case 2:
        return <Dashboard />
      case 3:
        return <Income />
      case 4:
        return <Expense />
      default:
        return <Dashboard />
    }
  }
  return (
    <AppStyled>
      <Navigation active={active} setActive={setActive} />
      <main>
        {displayData()}
      </main>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  display: flex;
  height: 100vh;
  background: #F4F4F4;
  main{
    flex: 1;
  }
`;

export default App;

