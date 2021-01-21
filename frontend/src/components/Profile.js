import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [display, setDisplay] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  let history = useHistory();

  let fetchData = async () => {
    const response = await axios.get('/api/user');
    console.log(response.data.name);
    setUser(response.data.name);
    setEmail(response.data.email);
    setDataLoaded(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(user);
    if (user !== 'Guest') {
      console.log("here's the problem");
      setDisplay(1);
    } else {
      console.log(1);
      setDisplay(0);
    }
  }, [dataLoaded]);

  const loginHandler = () => {
    history.push('/login');
  };

  const deleteHandler = async () => {
    await axios.delete('/delete');
  };

  const updateHandler = async (event) => {
    // event.preventDefault();

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
    await axios.post('/update', { hello: 'hello' }, config);
    //   post("/update",
    //   setName('');
    //   setEmail('');
    //   setPassword('');

    setDisplay(1);
    console.log(3);
  };
  const viewHandler = () => {
    console.log(2);
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
    />,
    <AccountUpdate
      updateHandler={updateHandler}
      setUser={setUser}
      user={user}
      email={email}
      setEmail={setEmail}
    />,
  ];

  return <div>{views[display]}</div>;
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
        <label>Email</label>
        <input
          type="text"
          value={props.user}
          onChange={(e) => props.setUser(e.target.value)}
        ></input>

        <label>Name</label>
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
        <button className="button" type="submit">
          update
        </button>
      </form>
    </div>
  );
};

export default Profile;
