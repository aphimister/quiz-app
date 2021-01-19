const Quizuser = require('../models/quizUser')
const { promisify } = require("util");
const jwt = require('jsonwebtoken');


exports.isLoggedIn = async (req, res, next) => {
    console.log("Do we have playerToken ")
    if(req.cookies.playerCookie){
        const decoded = await promisify(jwt.verify)(req.cookies.playerCookie, process.env.PLAYER_SECRET);
        console.log("info from decoded in auth")
        console.log(decoded)
        req.userFound = await Quizuser.findById(decoded.id)
    }

    next()
}
// if(req.cookie.quizToken){
//     console.log("I have the cookie")
// }