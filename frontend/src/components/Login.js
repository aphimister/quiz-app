
import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login =  () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginBackendVerified, setloginBackendVerified] = useState("");
  let history = useHistory();

  const formLoginHandler = async (event) => {
    event.preventDefault();

    console.log(email);
    console.log(password);

    const body = {
      userEmail: email,
      userPassword: password,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const loginSuccess = await axios.post("/login", body, config);

    setloginBackendVerified(loginSuccess.data.message);
    console.log(loginSuccess);

    
    
  
  };

  const clickHandler = () => {
    //  console.log(backendReg)
    history.push("/Register");
  }
  return (
    <div>
      <div className="title-container">
        <h1>Login</h1>

       

      </div>
      <div className="form-container">
        <form onSubmit={formLoginHandler} className="form">

          <label className="label">Email:</label>
          <input 
          className="input"
          type="email"
          name="userEmail"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}></input>

          <label className="label">Password:</label>
          <input
            className="input"
            type="password"
            name="userPassword"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <br />
          <button className="button btn-login">Login</button>
          <button type="button" 
          onClick={clickHandler}
          >
           Register
          </button>
        </form>
        
      </div>
    </div>
  );
};

export default Login;
