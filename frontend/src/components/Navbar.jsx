import React from "react"
import { Link } from "react-router-dom"
import MainButton from "./MainButton"

const Navbar = () => {
    return (
        <div className="w-screen h-30 flex items-center justify-center gap-150 max-[1000px]:gap-90 max-[750px]:gap-5">
            <Link to={"/"}>
                <div className="flex w-fit items-center justify-center gap-4 max-[420px]:gap-2 hover:cursor-pointer">
                    <img className="h-15 w-15 max-[500px]:h-8 max-[500px]:w-8"src="/noteify-logo.png" />
                    <h1 className="font-inter text-black max-[500px]:text-3xl text-4xl font-extrabold">noteify</h1>
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