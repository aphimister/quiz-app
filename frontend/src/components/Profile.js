import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link , useHistory } from "react-router-dom";



const Profile = () => {
  const [user, setUser] = useState([]);
  const [email, setEmail] = useState([]);
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
  // const updateDetailsHandler =  () => {
  //  return  <Redirect to="/accountUpdate"/>
  // };

  return (
    <div>
      {user !== "Guest" ? (
        <UserProfile
          title="Profile Page"
          user={user}
          email={email}
          deleteHandler={deleteHandler}
          // updateDetails={updateDetailsHandler}
        />
      ) : (
        <UserNotAuth
          title="Profile Page"
          guest="You need to login"
          loginHandler={loginHandler}
        />
      )}
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
      <Link to="/accountUpdate">
        <button className="button">Update My Account</button>
      </Link>
      
    
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

export default Profile;
