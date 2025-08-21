import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./App.css"
import App from './App.jsx'
import Login from './Login.jsx'
import Signup from './Signup.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Dashboard from './Dashboard.jsx'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { useState } from 'react'
import { auth } from './lib/firebaseClient.js'

const Root = () => {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return unsubscribe
  }, [])


  const router = createBrowserRouter([
    {path: "/", element: !user ? <App /> : <Dashboard userId={user.uid} userEmail={user.email} />},
    {path: "/login", element: !user ? <Login /> : <Dashboard userId={user.uid} userEmail={user.email} />},
    {path: "/signup", element: !user ? <Signup /> : <Dashboard userId={user.uid} userEmail={user.email} />},
    {path:"/dashboard", element: user ? <Dashboard userId={user.uid} userEmail={user.email} /> : <App />}
  ])

  return <RouterProvider router={router} />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>
)
