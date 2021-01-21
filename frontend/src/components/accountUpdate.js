import React, { useState } from 'react';
import axios from 'axios';

const accountUpdate = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const formHandler = async (event) => {
        event.preventDefault();
       
        const body = {
          userName: name,
          userEmail: email,
          userPassword: password,
        
        };
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
    
        const backend = await axios.post('/register', body, config);
        
        console.log(backend);
        setName('');
        setEmail('');
        setPassword('');
       
       
      };
    return (
        <updateAccount 
        formHandler={formHandler}
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      
        clickHandler={clickHandler}
        />
       
    )
}

const updateAccount = () => {
    return(
        <div>
        <div className="title">Register to start playing</div>
        <div className="formContainer">
          <form onSubmit={props.formHandler} className="form">
            <label className="label form">User Name:</label>
            <input
              className="input"
              type="text"
              value={props.name}
              onChange={(e) => props.setName(e.target.value)}
            ></input>
            <br />
  
            <label className="label">Email:</label>
            <input
              className="input"
              type="email"
              name="userEmail"
              value={props.email}
              onChange={(e) => props.setEmail(e.target.value)}
            ></input>
            <br />
  
            <label className="label">Password:</label>
            <input
              className="input"
              type="password"
              name="userPassword"
              placeholder="password"
              value={props.password}
              onChange={(e) => props.setPassword(e.target.value)}
            ></input>
            <input
              className="input passwords"
              type="password"
              name="userPassword2"
              placeholder="confirm password"
              value={props.password2}
              onChange={(e) => props.setPassword2(e.target.value)}
            ></input>
            <br />
            <button
              type="submit"
              className="button btn-login">
              Register
            </button>
            
            <button type="button" className="button" onClick={props.clickHandler}>
              Go To Login
            </button>
            <div className="App"></div>
          </form>
          {/* {backendMessage} */}
        </div>
      </div>
    )
}
export default accountUpdate
