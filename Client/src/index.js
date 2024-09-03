import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyle from '../src/styles/GlobalStyle.js';
import { GlobalProvider } from './context/globalContext';
import { UserProvider } from './context/userContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <userProvider>
      <GlobalStyle />
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </userProvider>
  </React.StrictMode>
);

