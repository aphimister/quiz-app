import React, {useState} from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginBackendVerified, setloginBackendVerified] = useState("");

 const formLoginHandler = async ( event) => {
    event.preventDefault();

    console.log(email);
    console.log(password);

    const body = {
     
      userEmail: email,
      userPasswor: password,
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const loginSuccess = await axios.post("/register", body, config)
    setloginBackendVerified(loginSuccess.data.message)
    console.log(loginSuccess)

  }
  return (
    <div>
       <div className="title-container">
        <h1>Login</h1>
    {loginBackendVerified}

      </div>
    <div className="form-container">
      <form onSubmit={formLoginHandler} className="form">

        <label className="label">Email:</label>
        <input onChange={(e) => setEmail(e.target.value)}></input>

        <label className="label">Password:</label>
        <input  onChange={(e) => setPassword(e.target.value)} className="input"></input> <br/>
        <button className="button btn-login">Register</button>
      </form>
      
    </div>
  </div>
  );
};

export default Login;
