import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState([ ])
    const [display, setDisplay] = useState(false);

let fetchData = async () => {
     const response = await axios.get("/profile")
    console.log(response.data.player.name)
    setUser(response.data.player.name)
 }

 useEffect(() => {
    fetchData()
 }, [] )

//  const clickHandler = () => {
   
//     setDisplay(!user);
//   };
         
    return (

        <div>
            {display ?  ( <UserNotAuth 
                title="Profile Page"
            profileMessage="Login or Register to Vue this page"
            // clickHandler={clickHandler}
            />) 
            : ( <UserProfile 
            title="Profile Page"
            user={user}
            // clickHandler={clickHandler}
            />) 
           
           
        }
        </div>
     
    )
}

const UserProfile = (props) => {
    return(
        <div>
        <h1>{props.title}</h1>
        
        <h4>{props.user}</h4>
        {/* <button onclick={props.clickHandler}>User Profile</button> */}
    </div>
    )
  
}


const UserNotAuth = (props) => {
    return(  
    <div>
        <h1>{props.title}</h1>
        
        <h4>{props.profileMessage}</h4>
        {/* <button onclick={props.clickHandler}>User Profile</button> */}
    </div>)
  
}

export default Profile

