import React, {useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";



// const Register1 = (props) => {

//   return (

//     <div>
//     {backend.data.registration === true ?
//     (<Login/>)
//     :(<Register />)}
//     </div>

//    )
// };

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [backendMessage, setBackendMessage] = useState("");
  const [backendReg, setBackendReg] = useState("");
  let history = useHistory();

  const formHandler = async (event) => {
    event.preventDefault();
    console.log(name);
    console.log(email);
    console.log(password);
   

    const body = {
      userName: name,
      userEmail: email,
      userPassword: password,
      userPassword2: password2,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const backend = await axios.post("/register", body, config);
    setBackendReg(backend.data.registration)
    setBackendMessage(backend.data.message);
    console.log(backend);
    
    if(backendReg) {
      history.push("/login");
   }else{
       history.push("/register")
    }
 

    setName("");
    setEmail("");
    setPassword("");
    setPassword2("");
    setBackendMessage("")
   
  };

     
 const clickHandler = () => {
  //  console.log(backendReg)
  history.push("/login");
}
  

  


 


  return (
    
    <div>
      <div className="title-container">
        <h1>Register to start playing</h1>
      </div>
      <div className="form-container">
        {backendMessage}

        <form onSubmit={formHandler } className="form">
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

          <button
            type="submit"
            className="button btn-login"
            // onClick={clickHandler}
            >
            Register
          </button>
          <button type="button" 
          onClick={clickHandler}
          >
           Go To Login 
          </button>
        <div className="App"></div>
        </form>
         
      </div>
    </div>
  );
  };

export default Register;
