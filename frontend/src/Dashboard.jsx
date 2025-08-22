import { getIdToken, signOut } from "firebase/auth"
import React from "react"
import { auth } from "./lib/firebaseClient"
import { useNavigate } from "react-router-dom"
import MainButton from "./components/MainButton"
import { FaPlus, FaPencil, FaRegTrashCan } from "react-icons/fa6";
import { MdOutlineCancel } from "react-icons/md"
import { FaSignOutAlt } from "react-icons/fa";
import { useEffect } from "react"
import { useState } from "react"


const Dashboard = ({ user }) => {
    const currentUser = JSON.parse(user)
    const [notes, setNotes] = useState([])
    const [currentNoteId, setCurrentNoteId] = useState("")
    const [title, setTitle] = useState("")
    const [message, setMessage] = useState("")
    const [open, setOpen] = useState(false)
    const [editing, setEditing] = useState(false)
    const navigate = useNavigate()

    const handleSignout = async () => {
        try {
            await signOut(auth)
            navigate("/")

        } catch (error) {
            alert("Sign out failed: " + error)
        }
    }

    const popUp = () => {
        setOpen((prev) => !prev)
    }

    const getNotes = async() => {
        try {
            const token = await auth.currentUser.getIdToken()
            console.log(token)
            const response = await fetch(`http://localhost:5050/notes`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })  
            const userNotes = await response.json()
            setNotes(userNotes)
        } catch (error) {
            console.error("Error: ", error)
            alert("Error fetching notes: " + error)
        }
    }

    const createNote = async(title, message) => {
        try {
            if (!title || !message) {
                alert("You can't submit an empty title or message!")
            }
            if (notes.length == 10) {
                alert("You are at the 10 note limit! Delete a note to create a new one.")
            }
            const token = await auth.currentUser.getIdToken()
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/createNote`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, message })
            })
            if (response.ok) {
                setOpen(false)
                setTitle("")
                setMessage("")
                getNotes()
            }
        } catch (error) {
            console.error("Error: ", error)
            alert("Error creating note: " + error)
        }
    }

    const editNote = (noteId, noteTitle, noteMessage) => {
        setCurrentNoteId(noteId)
        setTitle(noteTitle)
        setMessage(noteMessage)
        setEditing(true)
        setOpen(true)
    }

    const updateNote = async(title, message) => {
        try {
            if (!title || !message) {
                alert("You can't submit an empty title or message!")
            }
            const token = await auth.currentUser.getIdToken()
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/updateNote/${currentNoteId}`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, message })
            })
            if (response.ok){
                setOpen(false)
                setTitle("")
                setMessage("")
                setCurrentNoteId("")
                getNotes()
            }
        } catch (error) {
            console.error("Error: ", error)
            alert("Error updating note: " + error)
        }
    }

    const deleteNote = async(noteId) => {
        try {
            const token = await auth.currentUser.getIdToken()
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/deleteNote/${noteId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            
            if (response.ok) {
                getNotes()
            }
        } catch(error) {
            console.error("Error: ", error)
            alert("Error deleting note: " + error)
        }
    }
 

    useEffect(() => {
        getNotes()
    }, [])

    return (
       <section className="min-h-screen w-screen flex flex-row font-inter">
            <div className="flex flex-col min-[1000px]:justify-start items-center bg-[#F8FAFF] min-[1000px]:w-45 w-30 mt-10 gap-15 overflow-hidden">
                <div className="flex w-fit items-center justify-center gap-2 hover:cursor-pointer sticky top-0">
                    <img className="h-8 w-8"src="/noteify-logo.png" />
                    <h1 className="font-inter text-black text-2xl font-extrabold max-[1000px]:hidden">noteify</h1>
                </div>
                <div className="flex gap-5 flex-col overflow-hidden">
                    <div className="flex min-[1000px]:w-35 w-20 bg-[#787CFF] items-center justify-center rounded-3xl p-3 min-[1000px]:pl-3 min[1000px]:pr-4 pl-0 pr-0 text-white hover:text-black hover:bg-pink-200 hover:cursor-pointer min-[1000px]:gap-3 gap-2" onClick={() => popUp()}>
                        <FaPlus />
                        <h1 className="font-inter font-bold max-[1000px]:text-[10px]">
                            New Note
                        </h1>
                    </div>
                    <div className="flex min-[1000px]:w-35 w-20 bg-[#787CFF] items-center justify-center rounded-3xl p-3 min-[1000px]:pl-3 min[1000px]:pr-4 pl-0 pr-0 text-white hover:text-black hover:bg-pink-200 hover:cursor-pointer min-[1000px]:gap-3 gap-2"
                        onClick={() => handleSignout()}
                    >
                        <FaSignOutAlt />
                        <h1 className="font-inter font-bold max-[1000px]:text-[10px]">
                            Sign Out
                        </h1>
                    </div>
                </div>
            </div>
            <div className="flex font-inter flex-col h-screen w-screen pt-15 max-[700px]:pt-10 min-[500px]:pl-15 pl-5 min-[700px]:gap-15 gap-5 overflow-y-auto bg-[url(https://img.freepik.com/free-vector/white-abstract-wallpaper_23-2148830026.jpg)] bg-cover shadow-sm ">
                <h1 className="text-black font-extrabold min-[1000px]:text-4xl text-xl max-[700px]:hidden">👋 Hi, {currentUser.email.slice(0, currentUser.email.length - 10)}! <span className="bg-[#B3B6FF] rounded-xl p-2">Welcome to your dashboard.</span></h1>
                <div className="flex min-[1000px]:gap-3 ">
                    <div className="flex items-center gap-3">
                        <h1 className="text-black font-semibold min-[700px]:text-4xl text-xl items-center">My Notes</h1>
                        <h1 className="flex items-center justify-center text-black bg-gray-200 rounded-full max-[700px]:h-5 max-[700px]:w-5 h-10 w-10 border max-[700px]:text-[10px]">
                            {notes.length}
                        </h1>
                    </div>
                    {notes.length > 0 && (
                        <div className="flex min-[1470px]:ml-190 min-[1000px]:ml-100 ml-30 w-35 bg-[#787CFF] items-center justify-center rounded-3xl p-3 pl-5 pr-4 text-white max-[700px]:hidden
                         hover:text-black hover:bg-pink-200 hover:cursor-pointer gap-3" onClick={() => popUp()}>
                            <FaPlus />
                            <h1 className="font-inter font-bold">
                                New Note
                            </h1>
                        </div>
                    )}
                </div>
                {notes.length == 0 && (
                    <div className="flex w-60 bg-[#787CFF] items-center justify-center rounded-3xl p-3 pl-5 pr-4 text-white hover:text-black hover:bg-pink-200 hover:cursor-pointer gap-3" onClick={() => popUp()}>
                        <FaPlus />
                        <h1 className="font-inter font-bold">
                            Create Your First Note
                        </h1>
                    </div>
                )}
                <div className="grid min-[900px]:grid-cols-2 gap-4 grid-cols-1 mb-8">
                    {notes.map((note) => (
                        <div key={note._id} className="w-120 h-105 max-[1250px]:w-75 max-[1250px]:h-70 max-[430px]:w-65 max-[430px]:h-60 bg-gray-100 font-inter p-8 flex items-center flex-col gap-4 rounded-2xl shadow-2xl">
                            <h1 className="text-[#787CFF] font-extrabold text-xl max-[1250px]:text-sm text-center truncate w-full h-10">{note.title}</h1>
                            <p className="text-black font-normal max-[1250px]:text-[10px] w-full h-full overflow-y-scroll pt-3 max-[700px]:pt-0 pb-3 whitespace-pre-wrap">{note.message}</p>
                            <div className="flex w-full h-fit gap-5 items-center">
                                <h1 className="w-fit rounded-3xl p-4 max-[1250px]:p-2 font-inter font-bold bg-black text-xs max-[1250px]:text-[8px] text-white">{new Date(note.lastUpdated).toLocaleDateString()}</h1>
                                <FaPencil className="hover:text-[#787CFF] hover:cursor-pointer ml-auto" onClick={() => editNote(note._id, note.title, note.message)} />
                                <FaRegTrashCan className="hover:text-[#787CFF] hover:cursor-pointer" onClick={() => deleteNote(note._id)} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/50" />
                    <div className="relative bg-gray-100 w-140 h-135 rounded-3xl p-8 border-2">
                        <div className="w-full">
                            <MdOutlineCancel className="ml-auto w-5 h-fit hover:text-red-500 hover:cursor-pointer" 
                            onClick={() => {
                                setOpen(false)
                                setEditing(false)
                                setTitle("")
                                setMessage("")
                            }
                                } />
                        </div>
                        <form className="flex flex-col gap-10 font-inter w-full pt-5" onSubmit={(e) => {
                            e.preventDefault()
                            !editing ? createNote(title, message) : updateNote(title, message)
                        }}>
                            <input
                                type="text"
                                placeholder="Enter title"
                                value={title}
                                className="text-black bg-white p-2 w-full border-1 rounded-2xl"
                                onChange={(e) => setTitle(e.target.value)} 
                            ></input>
                            <textarea
                                type="text"
                                rows={10}
                                placeholder="Enter message"
                                value = {message}
                                className="text-black bg-white p-2 w-full border-1 rounded-2xl"
                                onChange={(e) => setMessage(e.target.value)}
                            ></textarea>
                            <MainButton text={!editing ? "Create" : "Update"} type="submit" />
                        </form>
                    </div>
                </div>
            )}
       </section>
    )
}

export default Dashboard