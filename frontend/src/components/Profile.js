import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState([]);
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [display, setDisplay] = useState(0);
  let history = useHistory();

  let fetchData = async () => {
    const response = await axios.get("/api/user");
    console.log(response.data.name);
    setUser(response.data.name);
    setEmail(response.data.email);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const loginHandler = () => {
    history.push("/login");
  };

  const deleteHandler = async () => {
    await axios.delete("/delete");
  };
  useEffect(() => {
    if (user !== "Guest") {
      setDisplay(1);
    }
  }, [user]);

  const updateHandler = async (event)  => {
    event.preventDefault();

    // const body = {
    //   userName: user,
    //   userEmail: email,
    //   userPassword: password,

    // };
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  await axios.post("/update", {hello:"hello"}, config)
  //   post("/update",
  //   setName('');
  //   setEmail('');
  //   setPassword('');

  setDisplay(1)
  }
  const viewHandler = () => {
    
    setDisplay(2);
  };


  const views = [
    <UserNotAuth
      title="Profile Page"
      guest="You need to login"
      loginHandler={loginHandler}
    />,
    <UserProfile
      title="Profile Page"
      user={user}
      email={email}
      deleteHandler={deleteHandler}
      viewHandler={viewHandler}
    />,<AccountUpdate 
    updateHandler={updateHandler}
    setUser={setUser}
    user={user}
    email={email}
    setEmail={setEmail}/>
  ];

  return (
    <div>
      {views[display]}
      {/* {user !== 'Guest' ? (
        <UserProfile
          title="Profile Page"
          user={user}
          email={email}
          deleteHandler={deleteHandler}
          updateHandler={updateHandler}
        />
      ) : (
        <UserNotAuth
          title="Profile Page"
          guest="You need to login"
          loginHandler={loginHandler}
        />
      )} */}
    </div>
  );
};

const UserProfile = (props) => {
  return (
    <div>
      <div className="title">{props.title}</div>
      <div className="subtitle">{props.user}</div>
      <div className="subtitle">{props.email}</div>
      <div>
        <button className="button" onClick={props.deleteHandler}>
          Delete account
        </button>
        <Link to="/quiz">
          <button className="button">Start a quiz</button>
        </Link>

        <button className="button" onClick={props.viewHandler}>
          Update My Account
        </button>
      </div>
    </div>
  );
};

const UserNotAuth = (props) => {
  return (
    <div>
      <div className="title">{props.title}</div>
      <div className="subtitle">{props.guest}</div>
      <div>
        <button className="button" onClick={props.loginHandler}>
          Login Page
        </button>
      </div>
    </div>
  );
};

const AccountUpdate = (props) => {
  return (
    <div>
      <form onSubmit={props.updateHandler}>
        <label>Name</label>
        <input
          type="text"
          value={props.user}
          onChange={(e) => props.setUser(e.target.value)}
        ></input>

        <label>Email</label>
        <input
          type="email"
          value={props.email}
          onChange={(e) => props.setEmail(e.target.value)}
        ></input>

        {/* <label>Password</label> */}
        {/* <input
          value={props.password}
          onChange={(e) => props.setName(e.target.value)}
          placeholder="password"
        ></input>
        <input
          value={props.password}
          onChange={(e) => props.setName(e.target.value)}
          placeholder="password"
        ></input> */}
        <button className="button" type="submit">update</button>
      </form>
    </div>
  );
};

export default Profile;
