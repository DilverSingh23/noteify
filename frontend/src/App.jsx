import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Link } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './lib/firebaseClient'
function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // When a user is logged in or signed up we are setting the user object from our firebase into our user state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    // The onAuthStateChanged returns an unsubscribe function that we call when the user leaves the tab or browser so our listener for user changes doesn't keep running
    return unsubscribe
  }, [])

  return (
    <section className="min-h-screen flex w-screen bg-[#F8FAFF] flex-col">
      <Navbar />
      <div className="w-full h-125 flex font-inter items-center justify-center mt-15">
        <div className='flex flex-col items-center justify-center ml-10 gap-8'>
          <div className='flex items-center justify-center flex-col'>
            <h1 className='text-black font-bold text-[75px]'>All your notes,</h1>
            <h1 className='bg-gradient-to-r from-[#4B4FCF] via-[#787CFF] to-[#B3B6FF] bg-clip-text text-transparent font-extrabold text-[75px]'>
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
    </section>
  )
}

export default App
 