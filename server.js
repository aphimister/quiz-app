const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const app = express();
const jwt = require("jsonwebtoken");
const Quizuser = require("./models/quizUser");
const check = require("./middlewares/check");
dotenv.config({ path: "./.env" });

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));
app.use(cors());
app.use(cookieParser() );

mongoose
.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected"));

app.get("/", (req, res) => {
  res.send("Hello from Alex, Jenny and Tom");
});

//USER BASED SERVER
//<----------------------- USER SECTION --------------------------->

//<----------------------- USER REGISTER --------------------------->
app.post("/register", async (req, res) => {
  console.log("at the back end ");
  console.log(req.body)
  const hashedPassword = await bcrypt.hash(req.body.userPassword, 10);
  const player = await Quizuser.find({ email: req.body.userEmail });
  const password1 = req.body.userPassword;
  const password2 = req.body.userPassword2;
  if (password1 !== password2) {
    res.json({
      errorPasswords: "Passwords Do Not Match",
    });
  } else if (player.length > 0) {
    res.json({
      errorPasswords: "Sorry Email Or Password Is Incorect ",
    });
  } else {
    await Quizuser.create({
      name: req.body.userName,
      email: req.body.userEmail,
      password: hashedPassword,
    });
    res.json({
      message: "user was registered",
    });
  }
});

//<--------------------- USER PROFILE ------------------------------->



//ADMIN BASED SERVER
//<----------------------- ADMIN SECTION --------------------------->

//LOGIN & LOGOUT SECTIONS
//<--------------------------Login ----------------------------------------------->>

app.get("/login", (req, res) => {
  console.log("at the back end "); // lets us know its working
  console.log(req.body); // front end input field to loggin
  res.json({
    message: "logged in ",
  }); // message display at fron end
});



app.post("/login", async (req, res) => {
  const player = await Quizuser.findOne({email: req.body.userEmail})
  console.log(player)
  const compare = await bcrypt.compare(req.body.userPassword, player.password);
  if(compare) {
    const quizToken = jwt.sign({id: player._id}, process.env.PLAYER_SECRET, {
      expiresIn: process.env.PLAYER_SECRET_IN
    })
    console.log(quizToken)//Does the token exist??// 
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.PLAYER_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      httpOnly: true
    }
    res.cookie("playerCookie", quizToken, cookieOptions);
  }
  
});

app.listen(5000, () => {
  console.log("Server is online");
});
