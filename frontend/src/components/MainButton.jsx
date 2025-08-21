import React from "react"

const MainButton = ({ text }) => {
    return (
        <button className="bg-[#787CFF] font-inter text-white font-bold p-3 pl-5 pr-4 rounded-3xl hover:text-black hover:bg-pink-200 hover:cursor-pointer">
            {text}
        </button>
    )
}


export default MainButton