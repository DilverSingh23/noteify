import React from "react";

const Footer = () => {
    return (
        <div className="flex h-20 w-screen bg-white text-black font-inter pl-10 pr-10 items-center justify-between shadow-2xl">
            <div className="flex w-fit items-center justify-center gap-2 hover:cursor-pointer sticky top-0">
                <img className="h-8 w-8"src="/noteify-logo.png" />
                <h1 className="font-inter text-black text-2xl font-extrabold">noteify</h1>
            </div>
            <h1 className="font-light">© 2025 Noteify. All rights reserved.</h1>
        </div>
    )
}

export default Footer