import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';

config({ path: '/Users/magicalnulu1800/Documents/Financial Dashboard/config.env' });

const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
