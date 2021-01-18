import React, { useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios"


const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [backendMessage, setBackendMessage] = useState("");


  const formHandler = async (event) => {
   event.preventDefault()
   console.log(name)
   console.log(email)
   console.log(password)

    const body = {
        userName: name,
        userEmail: email,
        userPassword: password,
        userPassword2: password2
      };
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
   
      const backend = await axios.post("/register", body, config)
      setBackendMessage(backend.data.message)
      console.log(backend)
    
      setName("");
      setEmail("");
      setPassword("");
      setPassword2("");

      

  }
 
  return (
    <div>
      <div className="title-container">
        <h1>Register to start playing</h1>
      </div>
      <div className="form-container">
        
        {backendMessage}

        <form onSubmit={formHandler} className="form">

          <label className="label">User Name:</label>
          <input
            className="input"
            type="text"
            name="userName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <br />

          <label className="label">Email:</label>
          <input
            className="input"
            type="email"
            name="userEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <br />

          <label className="label">Password:</label>
          <input
            className="input"
            type="password"
            name="userPassword"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
           <input
            className="input"
            type="password"
            name="userPassword2"
            placeholder="confirm password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          ></input>
          <br />

          <button type="submit" className="button btn-login" >
            Register
          </button>
        </form>

        <div className="App">
     
    </div>
      </div>
     
    </div>

  );
};

export default Register;
