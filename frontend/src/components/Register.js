import React, { useState } from "react";
import axios from "axios"


const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [backendMessage, setBackendMessage] = useState("");
//   const [counter, setCounter] = useState(60);

  const formHandler = async (event) => {
   event.preventDefault()
   console.log(name)
   console.log(email)
   console.log(password)

    const body = {
        userName: name,
        userEmail: email,
        userPassword: password
      };
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
   
      const backend = await axios.post("/register", body, config)
      setBackendMessage(backend.data.message)
      console.log(backend)
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
            onChange={(e)=>setName(e.target.value)}
          ></input>
          <br />

          <label className="label">Email:</label>
          <input
            className="input"
            type="email"
            name="userEmail"
              onChange={(e) => setEmail(e.target.value)}
          ></input>
          <br />

          <label className="label">Password:</label>
          <input
            className="input"
            type="password"
            name="userPassword"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <br />

          <button type="submit" className="button btn-login">
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
