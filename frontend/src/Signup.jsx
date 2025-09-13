import React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { userPool } from "./lib/cognitoConfig"
import { CognitoUserAttribute } from "amazon-cognito-identity-js"
import MainButton from "./components/MainButton"

const Signup = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    const handleSignup = async(e) => {
        e.preventDefault();
        const attributeList = [
            new CognitoUserAttribute({ Name: "email", Value: email})
        ];
        userPool.signUp(email, password, attributeList, null, (err, result) => {
            if(err){
                    alert("Error signing up: " + err);
                    console.error("Error signing up: ", err)
            }
            else {
                console.log("User " + result.user.getUsername() +  " sucessfully signed up")
                navigate("/")
            }
        })
    }

    return (
        <section className="w-screen min-h-screen flex justify-center items-center">
            <div className="min-[800px]:w-150 min-[800px]:h-145 w-95 h-100 flex items-center flex-col bg-gray-200 rounded-3xl shadow-2xl">
                <Link to={"/"}>
                    <div className="flex w-fit items-center justify-center gap-4 mt-10 hover:cursor-pointer">
                        <img className="min-[800px]:h-15 min-[800px]:w-15 h-8 w-8"src="/noteify-logo.png" />
                        <h1 className="font-inter text-black min-[800px]:text-4xl text-2xl font-extrabold">noteify</h1>
                    </div>
                </Link>
                <h1 className="text-black font-inter min-[800px]:text-2xl text-lg font-bold self-center mt-5">Sign Up</h1>
                <form className="flex min-[800px]:gap-12 gap-5 flex-col" onSubmit={(e) => handleSignup(e)}>
                    <div className="flex justify-start font-inter flex-col gap-3">
                        <label className="font-bold min-[800px]:text-2xl text-lg">Email</label>
                        <input
                            type="email"
                            className="bg-white text-black font-normal min-[800px]:w-105 w-75 h-10 p-3"
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        ></input>
                    </div>
                    <div className="flex justify-start font-inter flex-col gap-3">
                        <label className="font-bold min-[800px]:text-2xl text-lg">Password</label>
                        <input
                            type="password"
                            className="bg-white text-black font-normal min-[800px]:w-105 w-75 h-10 p-3"
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        ></input>
                    </div>
                    <div className="flex flex-col items-center w-full h-fit max-[800px]:gap-20">
                        <MainButton text={"Sign Up"}/>
                        <h1 className="font-inter font-semibold text-lg">Already have an account? <Link to={"/login"}><span className="underline text-[#787CFF]">Log In</span></Link></h1>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Signup