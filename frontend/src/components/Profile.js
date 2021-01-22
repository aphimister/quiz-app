import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Profile = (props) => {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [updatePassword, setUpdatePassword] = useState([]);
  const [display, setDisplay] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
<<<<<<< HEAD
  const [userScoreList, setUserScoreList] = useState([]);
  
=======
  const [messageUpdate, setMessageUpdate] = useState();
>>>>>>> 67e760f1b0654075947d8b5f4dc94d04ce24c1dc
  let history = useHistory();

  let fetchData = async () => {
    const response = await axios.get('/api/user');
    console.log(response.data.name);
    setUser(response.data.name);
    setEmail(response.data.email);

    setDataLoaded(true);
  };

  let userScores = async() => {
    const res = await axios.get('userScores');
    let temp= res.data;
    let tempArr = res.data.scores
    console.log(tempArr)
   if(temp){tempArr.sort((a, b) => 
    (a.score < b.score) ? 1 : 
    (a.score === b.score) ? ((a.time > b.time) ? 1 : -1) : -1 )}
    setUserScoreList(tempArr)

  };
  
  useEffect(() => {
    fetchData();
    userScores();
    
  }, []);

  useEffect(() => {
    console.log(user);
    if (user !== 'Guest') {
      setDisplay(1);
      
      
    } else {
      setDisplay(0);
    }
    
  }, [dataLoaded, props.data]);

  const loginHandler = () => {
    history.push('/login');
  };

  const deleteHandler = async () => {
    await axios.delete('/delete');
  };

  const updateHandler = async (event) => {
    event.preventDefault();

    const body = {
      userName: user,
      userEmail: email,
      userPassword: password,
      userUpdatePassword: updatePassword,
    };
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.put('/update', body, config);
    setMessageUpdate(response.data.Message);

    setUser('');
    setEmail('');
    setPassword('');
    setUpdatePassword('');

    window.location.reload(true);
  };
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
<<<<<<< HEAD
      userScoreList={userScoreList}
=======
      data={props.data}
      messageUpdate={messageUpdate}
>>>>>>> 67e760f1b0654075947d8b5f4dc94d04ce24c1dc
    />,
    <AccountUpdate
      updateHandler={updateHandler}
      setUser={setUser}
      user={user}
      email={email}
      setEmail={setEmail}
      setPassword={setPassword}
      setUpdatePassword={setUpdatePassword}
    />,
  ];

  return <div>{views[display]}</div>;
};

const UserProfile = (props) => {
  return (
    <div>
      {props.messageUpdate}
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
      <table className="table">
        <tr className="tableRow">
          <th className="tableHeader">Score</th>
          <th className="tableHeader">Name</th>
          <th className="tableHeader">Time</th>
        </tr>
        {props.userScoreList.slice(0,10).map((item, index)=>{
        console.log(item)
          return(
            <tr className="tableRow">
              <td className="tableData">{item.score}</td> 
              <td className="tableData">{item.user.name}</td>
              <td className="tableData">{item.time} secs</td>
            </tr>
          )
        })}
      </table>
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
      <form onSubmit={props.updateHandler} className="form">
        <label className="label form">Name</label>
        <input
          className="input"
          type="text"
          value={props.user}
          onChange={(e) => props.setUser(e.target.value)}
        ></input>
        <br />
        <label>Email</label>
        <input
          className="input"
          type="email"
          value={props.email}
          onChange={(e) => props.setEmail(e.target.value)}
        ></input>
        <br />
        <input
          className="input"
          type="password"
          onChange={(e) => props.setPassword(e.target.value)}
          placeholder="password"
        ></input>
        <br />
        <label>Update or confirm password</label>
        <input
          className="input"
          type="password"
          onChange={(e) => props.setUpdatePassword(e.target.value)}
        ></input>
        <br />
        <button className="button" type="submit">
          update
        </button>
      </form>
    </div>
  );
};

export default Profile;
