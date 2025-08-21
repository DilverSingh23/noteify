import React from "react"

const Navbar = () => {
    return (
        <div className="w-screen h-30 flex items-center justify-center gap-150">
            <div className="flex w-fit items-center justify-center gap-4 hover:cursor-pointer">
                <img className="h-15 w-15"src="/noteify-logo.png" />
                <h1 className="font-inter text-black text-4xl font-extrabold">noteify</h1>
            </div>
            <div className="flex w-fit items-center justify-center gap-3">
                <button className="bg-[#787CFF] font-inter text-white font-bold p-3 pl-5 pr-4 rounded-3xl hover:text-black hover:bg-pink-200 hover:cursor-pointer">Log In</button>
                <button className="bg-[#787CFF] font-inter text-white font-bold p-3 pl-5 pr-4 rounded-3xl hover:text-black hover:bg-pink-200 hover:cursor-pointer">Sign Up</button>
            </div>
        </div>
    )
}

export default Navbar