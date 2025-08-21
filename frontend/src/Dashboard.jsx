import { getIdToken, signOut } from "firebase/auth"
import React from "react"
import { auth } from "./lib/firebaseClient"
import { useNavigate } from "react-router-dom"
import MainButton from "./components/MainButton"
import { FaPlus } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
import { useEffect } from "react"
import { useState } from "react"


const Dashboard = ({ user }) => {
    const currentUser = JSON.parse(user)
    const [notes, setNotes] = useState([])
    const navigate = useNavigate()
    const handleSignout = async () => {
        try {
            await signOut(auth)
            navigate("/")

        } catch (error) {
            alert("Sign out failed: " + error)
        }
    }

    const getNotes = async() => {
        try {
            const token = await auth.currentUser.getIdToken()
            console.log(token)
            const response = await fetch("http://localhost:5050/notes", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })  
            const userNotes = await response.json()
            setNotes(userNotes)
        } catch (error) {
            console.error("Error: ", error)
            alert("Error fetching notes: ", error)
        }
    }


    useEffect(() => {
        getNotes()
    }, [])


    return (
       <section className="min-h-screen w-screen flex flex-row font-inter">
            <div className="flex flex-col justify-start items-center bg-[#F8FAFF] w-45 mt-10 gap-15 overflow-hidden">
                <div className="flex w-fit items-center justify-center gap-2 hover:cursor-pointer sticky top-0">
                    <img className="h-8 w-8"src="/noteify-logo.png" />
                    <h1 className="font-inter text-black text-2xl font-extrabold">noteify</h1>
                </div>
                <div className="flex gap-5 flex-col overflow-hidden">
                    <div className="flex w-35 bg-[#787CFF] items-center justify-center rounded-3xl p-3 pl-5 pr-4 text-white hover:text-black hover:bg-pink-200 hover:cursor-pointer gap-3">
                        <FaPlus />
                        <h1 className="font-inter font-bold">
                            New Note
                        </h1>
                    </div>
                    <div className="flex w-35 bg-[#787CFF] items-center justify-center rounded-3xl p-3 pl-5 pr-4 text-white hover:text-black hover:bg-pink-200 hover:cursor-pointer gap-3"
                        onClick={() => handleSignout()}
                    >
                        <FaSignOutAlt />
                        <h1 className="font-inter font-bold">
                            Sign Out
                        </h1>
                    </div>
                </div>
            </div>
            <div className="flex font-inter flex-col h-screen w-screen pt-15 pl-15 gap-15 overflow-y-auto">
                <h1 className="text-black font-extrabold text-4xl">👋 Hi, {currentUser.email.slice(0, currentUser.email.length - 10)}! <span className="bg-[#B3B6FF] rounded-xl p-2">Welcome to your dashboard.</span></h1>
                <h1 className="text-black font-light text-4xl">My Notes</h1>
                <div className="grid grid-cols-5 gap-4 mb-8">
                    {notes.map((note) => (
                        <div key={note._id} className="w-120 h-100 bg-gray-100 font-inter p-8 flex items-center flex-col gap-5 rounded-2xl">
                            <h1 className="text-[#787CFF] font-extrabold text-lg text-center truncate w-full border-2">{note.title}</h1>
                            <p className="text-black font-light text-m border-2 w-full h-full overflow-y-scroll p-3">{note.message}</p>
                        </div>
                    ))}
                </div>
            </div>
       </section> 
    )
}

export default Dashboard