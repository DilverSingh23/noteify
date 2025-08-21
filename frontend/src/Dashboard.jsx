import { signOut } from "firebase/auth"
import React from "react"
import { auth } from "./lib/firebaseClient"
import { useNavigate } from "react-router-dom"


const Dashboard = () => {
    const navigate = useNavigate()
    const handleSignout = async () => {
        try {
            await signOut(auth)
            navigate("/")

        } catch (error) {
            alert("Sign out failed: " + error)
        }
    }
    return (
       <div>
            <button onClick={()=> handleSignout()} className="w-50 h-50 bg-red-500">Sign Out</button>
       </div> 
    )
}

export default Dashboard