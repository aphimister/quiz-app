const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();

dotenv.config({ path: './.env' });

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello from the backend');
});

app.listen(5000, () => {
  console.log('Server is online');
});
