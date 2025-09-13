import React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import MainButton from "./components/MainButton"
import { userPool } from "./lib/cognitoConfig"
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = async(e) => {
        e.preventDefault();
        const user = new CognitoUser({
            Username: email,
            Pool: userPool
        });

        const authDetails = new AuthenticationDetails({
            Username: email,
            Password: password
        });

        user.authenticateUser(authDetails, {
            onSuccess: (result) => {
                console.log("User logged in successfully." + result)
                navigate("/")
            },
            onFailure: (err) => {
                alert("User log in failed " + err)
                console.error("User log in failed: ", err)
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
                <h1 className="text-black font-inter min-[800px]:text-2xl text-lg font-bold self-center mt-5">Log In</h1>
                <form className="flex min-[800px]:gap-12 gap-5 flex-col" onSubmit={(e) => handleLogin(e)}>
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
                    <div className="flex flex-col items-center w-full h-fit gap-10 max-[800px]:gap-20">
                        <MainButton text={"Log In"}/>
                        <h1 className="font-inter font-semibold text-lg">Don't have an account? <Link to={"/signup"}><span className="underline text-[#787CFF]">Sign Up</span></Link></h1>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Login