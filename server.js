const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

const app = express();

dotenv.config({ path: './.env' });

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));
app.use(cors());

mongoose.connect(process.env.DB_URL, {
   useNewUrlParser: true,
   useCreateIndex: true,
   useFindAndModify: false,
   useUnifiedTopology: true,
 })
 .then(() => console.log('MongoDB is connected'));


const viewsPath = path.join(__dirname, '/views');
const publicDirectory = path.join(__dirname, '/public');

app.set('views', viewsPath);
app.use(express.static(publicDirectory));

app.use(express.urlencoded({extended: false}));
app.use(express.json({extended: false}));



app.get('/', (req, res) => {
  res.send('Hello from Alex, Jenny and Tom');
});

app.listen(5000, () => {
  console.log('Server is online');
});
