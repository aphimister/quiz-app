const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const app = express();
const Quizuser = require('./models/quizUser')
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

//USER BASED SERVER
//<----------------------- USER SECTION --------------------------->

//<----------------------- USER REGISTER --------------------------->
app.get('/register', async (req, res) => {

  await Quizuser.create({
    name: "john",
    email: "john@codenation.com",
    password: 1234
  })
  res.send("user registered")
});

//ADMIN BASED SERVER
//<----------------------- ADMIN SECTION --------------------------->


//LOGIN & LOGOUT SECTIONS
//<--------------------------Login ----------------------------------------------->>

app.get("/login", (req, res) => {
  res.json({
    message: "logged in "
})
});




app.listen(5000, () => {
  console.log('Server is online');
});
