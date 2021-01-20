
//<----------Import dependencies -------------------->
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const app = express();
const jwt = require('jsonwebtoken');
const Quizuser = require('./models/quizUser');
const Score = require('./models/scoreModel');
const check = require('./middlewares/check');// check.isLoggedIn
dotenv.config({ path: './.env' });
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));
app.use(cors());
app.use(cookieParser());

//<----------------Database connection ---------------->
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB is connected'));

//<
app.get('/', (req, res) => {
  res.send('Hello from Alex, Jenny and Tom');
});

//USER BASED SERVER
//<----------------------- USER SECTION --------------------------->

//<----------------------- USER REGISTER --------------------------->
app.post('/register', async (req, res) => {
  console.log('at the back end ');
  console.log(req.body);
  const hashedPassword = await bcrypt.hash(req.body.userPassword, 10);
  const player = await Quizuser.find({ email: req.body.userEmail });
  const password1 = req.body.userPassword;
  const password2 = req.body.userPassword2;
  if (password1 !== password2) {
    res.json({
      errorPasswords: 'Passwords Do Not Match',
    });
  } else if (player.length > 0) {
    res.json({
      registration: false,
      errorPasswords: 'Sorry Email Or Password Is Incorect ',
    });
  } else {
    await Quizuser.create({
      name: req.body.userName,
      email: req.body.userEmail,
      password: hashedPassword,
    });
    res.json({
      registration: true,
      message: 'user was registered',
    });
  }
});

  
  

//<--------------------- USER PROFILE ------------------------------->
app.get("/profile", check.isLoggedIn, async (req,res) =>{
  const playerId = req.userFound._id
  const playerDB = await Quizuser.findById(playerId);
  console.log(playerDB)
  res.json({
    user: playerDB
  })
} )



//ADMIN BASED SERVER
//<----------------------- ADMIN SECTION --------------------------->

//LOGIN & LOGOUT SECTIONS
//<--------------------------Login ----------------------------------------------->>

app.get('/login', (req, res) => {
  console.log('at the back end '); // lets us know its working
  console.log(req.body); // front end input field to loggin
  res.json({
    message: 'logged in ',
  }); // message display at fron end
});


app.post('/login', async (req, res) => {
  const player = await Quizuser.findOne({ email: req.body.userEmail });
  console.log(player);
  const compare = await bcrypt.compare(req.body.userPassword, player.password);

  if(compare) {
    const quizToken = jwt.sign({id: player._id}, process.env.PLAYER_SECRET, {
      expiresIn: process.env.PLAYER_SECRET_IN
    })
    console.log(quizToken)//Does the token exist??// 
    const cookieOptions = {
      expires: new Date(Date.now() + process.env.PLAYER_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
      httpOnly: true
    }
   
    res.cookie("playerCookie", quizToken, cookieOptions);
    res.json({ player:player.name, token: quizToken })
    res.send("logged in")
  }
});



//Results section
//<--------------------------Results----------------------------------------------->>

app.post('/api/score', async (req, res) => {
  // console.log(req.body);
  await Score.create({
    score: req.body.score,
    time: req.body.time,
    difficulty: req.body.difficulty,
    category: req.body.category,
    user: '6006b4af3bd6c64d37206fa2'
  })

  res.send('nice one');
});

app.get("/topscores", async (req, res) => {
    const scoreDB = await Score.find().populate('user', 'name');
    // console.log(scoreDB)
      res.json({
        scores: scoreDB
    })
});


app.listen(5000, () => {
  console.log('Server is online');
});
