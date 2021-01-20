import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState([ ])
    const [email, setEmail] = useState([ ])
   

let fetchData = async () => {
     const response = await axios.get("/api/user")
    console.log(response.data.name)
    setUser(response.data.name)
    setEmail(response.data.email)
 }

 useEffect(() => {
    fetchData()
 }, [] )

//  const clickHandler = () => {
   
//     setDisplay(!user);
//   };
         
    return (

     
           <UserProfile 
            title="Profile Page"
            user={user}
            email={email}
            // clickHandler={clickHandler}
            />) 
           
        
     
 
}

const UserProfile = (props) => {
    return(
        <div>
        
        <div className="title">{props.title}</div>
        <div className="subtitle">{props.user}</div>
        <div className="subtitle">{props.email}</div>
        {/* <button onclick={props.clickHandler}>User Profile</button> */}
    </div>
    )
  
}


// const UserNotAuth = (props) => {
//     return(  
//     <div>
//         <h1>{props.title}</h1>
        
//         <h4>{props.profileMessage}</h4>
//         {/* <button onclick={props.clickHandler}>User Profile</button> */}
//     </div>)
  
// }

export default Profile

