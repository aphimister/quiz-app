import axios from 'axios'
import React, {useEffect, useState} from 'react'

const Profile = () => {
    const [user, setUser] = useState([ ])
    

let fetchData = async () => {
     const response = await axios.get("/profile")
    console.log(response.data.user.name)
    setUser(response.data.user.name)
 }
 useEffect(() => {
    fetchData()
 }, [] )

         
    return (

        <div>
            <h1>Profile page</h1>
            
            <h4>{user}</h4>
        </div>
    )
}

export default Profile

