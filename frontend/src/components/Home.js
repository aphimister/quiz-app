import React from 'react';
import {Link} from 'react-router-dom'

const Home = () => {
    return (
        <div>
            <h1>Home Page</h1>
            <Link to='/quiz'><button>Start a quiz</button></Link><br /><br />
            <Link to='/topscores'><button>See the leaderboards</button></Link>
        </div>

    )
}

export default Home
