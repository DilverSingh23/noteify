import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Link } from 'react-router-dom'
import Footer from './components/Footer'

function App() {
  return (
    <section className="min-h-screen flex w-screen bg-[#F8FAFF] bg-[url(https://img.freepik.com/free-vector/neumorphic-style-blank-white-banner-with-slanting-lines-design_1017-53841.jpg?semt=ais_hybrid&w=740)] bg-contain flex-col">
      <Navbar />
      <div className="w-full h-125 flex font-inter items-center justify-center mt-15">
        <div className='flex flex-col items-center justify-center ml-10 gap-8'>
          <div className='flex items-center justify-center flex-col min-[1440px]:text-[75px] text-[60px]'>
            <h1 className='text-black font-bold '>All your notes,</h1>
            <h1 className='bg-gradient-to-r from-[#4B4FCF] via-[#787CFF] to-[#B3B6FF] bg-clip-text text-transparent font-extrabold'>
              without the clutter
            </h1>
          </div>
          <h2 className="text-gray-400 text-light text-[22px] w-150 text-center">
            Stop juggling <b>apps</b> and <b>sticky notes</b>. Noteify keeps everything <i>organized</i>, <i>synced</i>, and <i>ready when you are</i>.
          </h2>
          <Link to={"/login"}>
            <button className="bg-[#787CFF] font-inter text-white font-extrabold p-5 pl-6 pr-6 rounded-4xl hover:text-black hover:bg-pink-200 hover:cursor-pointer mt-10 text-xl">
              Start Taking Notes
            </button>
          </Link>
        </div>
        <img src="./noteify-landing.png" className='h-90 w-185'/>
      </div>
      <div className='flex flex-col justify-center items-center mt-35 gap-10 bg-[#787CFF] rounded-4xl w-fit self-center p-10 shadow-2xl'>
        <h1 className='font-inter text-white font-bold text-[28px]'>Noteify securely saves all your notes in one place — private, organized, and only visible to you.</h1>
        <img className="w-260 h-150 rounded-3xl shadow-2xl"src="/noteify-dashboard.png" />
      </div>
      <div className='flex w-full h-150 items-center justify-center mt-10'>
        <div className='grid grid-cols-4 gap-7 place-items-center w-fit h-100'>
          <div className='flex flex-col justify-center items-center font-inter gap-3'>
            <img src="/noteify-read.png" className='rounded-2xl w-60 h-50 border-2 shadow-xl' />
            <h2 className='font-extrabold text-xl text-[#787CFF]'>View</h2>
            <p className='text-gray-500 text-xs'>Read all of your saved notes - anytime, anywhere.</p>
          </div>
          <div className='flex flex-col justify-center items-center font-inter gap-3'>
            <img src="/noteify-new.png" className='rounded-2xl w-60 h-50 border-2 shadow-xl' />
            <h2 className='font-extrabold text-xl text-[#787CFF]'>Create</h2>
            <p className='text-gray-500 text-xs'>Create notes with a title and message of your choice.</p>
          </div>
          <div className='flex flex-col justify-center items-center font-inter gap-3'>
            <img src="/noteify-edit.png" className='rounded-2xl w-60 h-50 border-2 shadow-xl' />
            <h2 className='font-extrabold text-xl text-[#787CFF]'>Edit</h2>
            <p className='text-gray-500 text-xs'>Update your notes to keep your information accurate.</p>
          </div>
          <div className='flex flex-col justify-center items-center font-inter gap-3'>
            <img src="/noteify-delete.png" className='rounded-2xl w-60 h-50 border-2 shadow-xl' />
            <h2 className='font-extrabold text-xl text-[#787CFF]'>Delete</h2>
            <p className='text-gray-500 text-xs'>Remove notes you no longer need - quickly and easily.</p>
          </div>
        </div>
      </div>
      <div className='flex flex-col font-inter text-black text-6xl w-full h-full justify-center items-center font-extrabold gap-5 mb-50 mt-10 
      bg-[url(https://img.freepik.com/free-vector/neumorphic-style-blank-white-banner-with-slanting-lines-design_1017-53841.jpg?semt=ais_hybrid&w=740)] bg-cover '>
        <h1>Ready to declutter your mind?</h1>
        <h1 className='bg-gradient-to-r from-[#4B4FCF] via-[#787CFF] to-[#B3B6FF] bg-clip-text text-transparent font-extrabold h-20'>
          Try Noteify today.
        </h1>
        <Link to={"/login"}>
          <button className="bg-[#787CFF] font-inter text-white font-extrabold p-5 pl-6 pr-6 rounded-4xl hover:text-black hover:bg-pink-200 hover:cursor-pointer text-xl">
            Get Started
          </button>
        </Link>
      </div>
      <Footer />
    </section>
  )
}

export default App
 