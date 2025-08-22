import React from "react";

const Footer = () => {
    return (
        <div className="flex h-20 w-screen bg-white text-black font-inter min-[470px]:pl-10 min-[470px]:pr-10 pl-2 pr-2 items-center justify-between shadow-2xl max-[400px]:flex-col max-[400px]:pt-2 max-[400px]:gap-3">
            <div className="flex w-fit items-center justify-center gap-2 hover:cursor-pointer sticky top-0">
                <img className="h-8 w-8"src="/noteify-logo.png" />
                <h1 className="font-inter text-black text-2xl font-extrabold">noteify</h1>
            </div>
            <h1 className="font-light">© 2025 Noteify. All rights reserved.</h1>
        </div>
    )
}

export default Footer