import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./App.css"
import App from './App.jsx'
import Login from './Login.jsx'
import Signup from './Signup.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Dashboard from './Dashboard.jsx'
import { useEffect } from 'react'
import { useState } from 'react'
import { getCurrentUser } from './lib/cognitoConfig.js'

import { Buffer } from 'buffer'
window.Buffer = Buffer
import process from 'process'
window.process = process

const Root = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    getCurrentUser().then(setUser)
    const interval = setInterval(() => {
      getCurrentUser().then(setUser)
    }, 2000)

    return () => clearInterval(interval)
  }, [])


  const router = createBrowserRouter([
    {path: "/", element: !user ? <App /> : <Dashboard user={JSON.stringify(user)} />},
    {path: "/login", element: !user ? <Login /> : <Dashboard user={JSON.stringify(user)} />},
    {path: "/signup", element: !user ? <Signup /> : <Dashboard user={JSON.stringify(user)} />},
    {path:"/dashboard", element: user ? <Dashboard user={JSON.stringify(user)} /> : <App />}
  ])

  return <RouterProvider router={router} />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>
)
