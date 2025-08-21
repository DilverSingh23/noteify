import React from "react"
import { Link } from "react-router-dom"
import MainButton from "./MainButton"

const Navbar = () => {
    return (
        <div className="w-screen h-30 flex items-center justify-center gap-150">
            <Link to={"/"}>
                <div className="flex w-fit items-center justify-center gap-4 hover:cursor-pointer">
                    <img className="h-15 w-15"src="/noteify-logo.png" />
                    <h1 className="font-inter text-black text-4xl font-extrabold">noteify</h1>
                </div>
            </Link>
            <div className="flex w-fit items-center justify-center gap-3">
                <Link to={"/login"}>
                    <MainButton text={"Log In"}/>
                </Link>
                <Link to={"/signup"}>
                    <MainButton text={"Sign Up"} />
                </Link>
            </div>
        </div>
    )
}

export default Navbar