
A full-stack web application and database system built with the MERN stack.

## Description

This web application is designed to help users efficiently manage their personal finances. This platform tracks income, expenses, and offers a visual breakdown of financial data. It provides users with a comprehensive dashboard that displays key financial metrics, alongside an interactive pie chart that categorizes spending. The application also generates graphical representations of income and expense trends, helping users make informed decisions about their budgeting and savings. The platform is divided into four key sections:

### Dashboard 📊

The central hub, displaying interactive graphs and visualizations, including income and expense trends, totals, averages, and breakdowns over time.

### Transactions 💼

A comprehensive list of all financial transactions, categorized by type, with easy access to view all historical data.

### Incomes 💵

Add and track sources of income, with summary statistics showing total income, as well as minimum, maximum, and average earnings.

### Expenses 🧾

Add and track expenses, categorized by type, with summary statistics showing total expenses, as well as minimum, maximum, and average spending.

## Technologies

### Frontend

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![HTML](https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white)

### Backend

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)

### Database

![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)



### Prerequisites

- Git installed on your machine
- Latest version of Node.js
- MongoDB installed locally

### Clone the Repository


> [!IMPORTANT]
> Ensure both `client/client.env` and `server/server.env` are renamed to `.env` and are properly configured with the necessary environment variables before hosting locally.

### Starting The Client

```bash
cd client             # Navigate to the client directory.
npm i -y              # Install dependencies.
npm run dev           # Start the client.
```

> [!NOTE]
> A new window will automatically open in your default browser at http://localhost:3000

### Starting The Server

```bash
cd server      	      # Navigate to the server directory.
npm i                 # Install dependencies.
npm start             # Start the server.
```
