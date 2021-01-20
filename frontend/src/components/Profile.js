import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState([]);
  const [email, setEmail] = useState([]);

  let fetchData = async () => {
    const response = await axios.get('/api/user');
    console.log(response.data.name);
    setUser(response.data.name);
    setEmail(response.data.email);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <UserProfile title="Profile Page" user={user} email={email} />;
};

const UserProfile = (props) => {
  return (
    <div>
      <div className="title">{props.title}</div>
      <div className="subtitle">{props.user}</div>
      <div className="subtitle">{props.email}</div>
    </div>
  );
};

export default Profile;
