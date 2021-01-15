
import React, { useState } from "react";
import axios from "axios";

const Login =  () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginBackendVerified, setloginBackendVerified] = useState("");

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
  return (
    <div>
      <div className="title-container">
        <h1>Login</h1>

        {loginBackendVerified}

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
          <button className="button btn-login">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
