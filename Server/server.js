const express = require('express');
const cors = require('cors');
const { config } = require('dotenv');
const { db } = require('../Server/db/connection.js');
const { readdirSync } = require('fs');
const path = require('path');
// Load environment variables from .env file
config({ path: '../Server/config.env' });

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

readdirSync('./routes').map((route) => app.use('/api', require('./routes/' + route)))

const server = () => {
  db()
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
}

server()