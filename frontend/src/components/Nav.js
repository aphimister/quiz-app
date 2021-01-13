import React from 'react'
import {Link} from 'react-router-dom'

const Nav = () => {
    return (
       <nav>
           <h1>Chuch Norris Jokes</h1>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/">Profile</Link>
                    </li>
                    <li>
                        <Link to="/Login">Login</Link>
                    </li>
                    <li>
                        <Link to="/Logout">Logout</Link>
                    </li>

                </ul>
       </nav>
    )
}

export default Nav