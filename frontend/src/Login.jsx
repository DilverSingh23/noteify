import { signInWithEmailAndPassword } from "firebase/auth"
import React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { auth } from "./lib/firebaseClient"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async(e) => {
        e.preventDefault()
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch(error) {
            alert("Login failed: " + error)
        }
    }
    return (
        <section className="w-screen min-h-screen flex justify-center items-center">
            <div className="w-150 h-125 flex items-center flex-col bg-gray-200 rounded-2xl">
                <Link to={"/"}>
                    <div className="flex w-fit items-center justify-center gap-4 mt-10 hover:cursor-pointer">
                        <img className="h-15 w-15"src="/noteify-logo.png" />
                        <h1 className="font-inter text-black text-4xl font-extrabold">noteify</h1>
                    </div>
                </Link>
                <h1 className="text-black font-inter text-2xl font-bold self-center mt-5">Log In</h1>
                <form className="flex gap-12 flex-col" onSubmit={(e) => handleLogin(e)}>
                    <div className="flex justify-start font-inter flex-col gap-3">
                        <label className="font-bold text-2xl">Email</label>
                        <input
                            type="email"
                            className="bg-white text-black font-normal w-105 h-10 p-3"
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        ></input>
                    </div>
                    <div className="flex justify-start font-inter flex-col gap-3">
                        <label className="font-bold text-2xl">Password</label>
                        <input
                            type="password"
                            className="bg-white text-black font-normal w-105 h-10 p-3"
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        ></input>
                    </div>
                    <button type="submit" className="font-bold bg-[#787CFF] text-white w-30 p-3 rounded-3xl self-center hover:bg-pink-200 hover:cursor-pointer hover:text-black">Log In</button>
                </form>
            </div>
        </section>
    )
}

export default Login