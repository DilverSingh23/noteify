import { signOut } from "firebase/auth"
import React from "react"
import { auth } from "./lib/firebaseClient"
import { useNavigate } from "react-router-dom"
import MainButton from "./components/MainButton"
import { FaPlus } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";


const Dashboard = ( { userId, userEmail }) => {
    const navigate = useNavigate()
    const handleSignout = async () => {
        try {
            await signOut(auth)
            navigate("/")
            console.log("Here")

        } catch (error) {
            alert("Sign out failed: " + error)
        }
    }
    return (
       <section className="min-h-screen w-screen flex flex-row font-inter">
            <div className="flex flex-col justify-start items-center bg-[#F8FAFF] w-45 mt-10 gap-15 ">
                <div className="flex w-fit items-center justify-center gap-2 hover:cursor-pointer">
                    <img className="h-8 w-8"src="/noteify-logo.png" />
                    <h1 className="font-inter text-black text-2xl font-extrabold">noteify</h1>
                </div>
                <div className="flex gap-5 flex-col">
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
            <div className="flex font-inter flex-col h-screen w-screen mt-15 ml-15 gap-15">
                <h1 className="text-black font-extrabold text-4xl">👋 Hi, {userEmail.slice(0, userEmail.length - 10)}! <span className="bg-[#B3B6FF] rounded-xl p-2">Welcome to your dashboard.</span></h1>
                <h1 className="text-black font-light text-4xl">My Notes</h1>

            </div>
       </section> 
    )
}

export default Dashboard