import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="nav">
      <ul className="un-list">
        <li className="li-list">
          <Link className="link" to="/">
            Home
          </Link>
        </li>
        <li className="li-list">
          <Link className="link" to="/profile">
            Profile
          </Link>
        </li>
        <li className="li-list">
          <Link className="link" to="/login">
            Login
          </Link>
        </li>
        <li className="li-list">
          <Link className="link" to="/logout">
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
