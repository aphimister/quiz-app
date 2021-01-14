import React, {useState, useEffect}from "react";
import axios from "axios"


const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
//   const [counter, setCounter] = useState(60);

  const formHandler = async ( ) => {
    console.log(name);
    console.log(email);
    console.log(password);

    const body = {
        userName: name,
        userEmail: email,
        userPasswor: password,
      };
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
   
    await axios.post("/register", body, config)
  }

//   useEffect(() => {
   
//     counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
//   }, []);


//   let countDownTime = new Date().getMinutes()
//   console.log(countDownTime)
//   let timeInterval = () => {
//         let timeNow = new Date().getMinutes()

//         let diffInTime = countDownTime - timeNow

//         let mins = Math.floor((diffInTime % (1000 * 60 * 60)) / (1000 * 60))

//         console.log(mins)

//   }

  return (
    <div>
      <div className="title-container">
        <h1>Register to start playing</h1>
      </div>
      <div className="form-container">
        <form onSubmit={formHandler} className="form">
          <label className="label">User Name:</label>
          <input
            className="input"
            type="text"
            name="useName"
              onChange={(e) => setName(e.target.value)}
          ></input>
          <br />

          <label className="label">Email:</label>
          <input
            className="input"
            type="text"
            name="useEmail"
              onChange={(e) => setEmail(e.target.value)}
          ></input>
          <br />

          <label className="label">Password:</label>
          <input
            className="input"
            type="password"
            name="usePassword"
              onChange={(e) => setPassword(e.target.value)}
          ></input>
          <br />

          <button className="button btn-login" type="submit">
            Register
          </button>
        </form>

        <div className="App">
      {/* <div>Countdown: {counter}</div> */}
    </div>
      </div>
     
    </div>

  );
};

export default Register;
