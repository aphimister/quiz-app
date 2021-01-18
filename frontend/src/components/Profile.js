import axios from 'axios'
import React, {useEffect} from 'react'

const Profile = () => {
 const fetchData = async () => {
     const response = await axios.get("/profile")
    console.log(response.data)
 }
 useEffect(() => {
    fetchData()
 }, [])

         
    return (
        <div>
            
        </div>
    )
}

export default Profile

