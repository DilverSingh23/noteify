import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./App.css"
import App from './App.jsx'
import Login from './Login.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

const router = createBrowserRouter([
  {path: "/", element: <App />},
  {path: "/login", element: <Login />}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
