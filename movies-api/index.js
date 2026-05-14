import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import usersRouter from './api/users/index.js';
import './db/index.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.use('/api/users', usersRouter);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});