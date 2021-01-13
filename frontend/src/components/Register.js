import React, {useState}from "react";


const Register = () => {

    const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formHandler = ( ) => {


    // const response = await axios.post("/register")
  }

  return (
    <div>
      <div class="title-container">
        <h1>Register to start playing</h1>
      </div>
      <div className="form-container">
        <form onSubmit={formHandler} classNmae="form">
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
      </div>
    </div>
  );
};

export default Register;
