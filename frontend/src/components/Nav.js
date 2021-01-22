import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const logOutHandler = async () => {
  await axios.get('/logout');
};
const Nav = (props) => {
  return (
    <nav className="nav">
      <ul className="un-list">
        <li className="li-list">
          <Link className="link" to="/">
            Home
          </Link>
        </li>
        <li className="li-list">
          <Link className="link" to="/profile" >
            Profile
          </Link>
        </li>
        <li className="li-list">
          <Link className="link" to="/login">
            Login
          </Link>
        </li>
        <li className="li-list">
          <Link to="/logout" className="link" onClick={logOutHandler}>
            Logout
          </Link>
        </li>
        {/* <li className="li-list">
                        <Link className='link-register' to="/register">Register</Link>
                    </li> */}
      </ul>
    </nav>
  );
};

export default Nav;
