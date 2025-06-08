const express = require('express');
const cors = require('cors');
const { config } = require('dotenv');
const { db } = require('../Server/db/connection.js');
const { readdirSync } = require('fs');
const path = require('path');
// Load environment variables from .env file
config();

const app = express();
const PORT = 3001 || process.env.PORT;

const allowedOrigins = ['http://localhost:3000', 'https://myfinancy.vercel.app'];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(cors(corsOptions));

app.use(express.json());

readdirSync('./routes').map((route) => app.use('/api', require('./routes/' + route)))

const server = () => {
  db()
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
}

server()