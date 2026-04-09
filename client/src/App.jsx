import { Routes, Route, useLocation } from 'react-router-dom'
import { ToastContainer } from "react-toastify"

import { useEffect, useState } from 'react'

import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase.config"

import PrivateRoute from "./guards/PrivateRoute"

import Aside from './components/Aside'

import Feed from './pages/Feed'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Announce from './pages/Announce'

import { AuthContext } from './utils/authContext'

import 'react-toastify/dist/ReactToastify.css'

function AppContent(){
  const location = useLocation()
  const hideAside = location.pathname === "/login" || location.pathname === "/register"

  return(
    <div className="min-h-screen flex">
      {!hideAside && <Aside />}
      <div className="flex-1 flex flex-col overflow-y-auto h-[100dvh]">
        <Routes>
          <Route path='/' element={<PrivateRoute><Feed /></PrivateRoute>}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>}/>
          <Route path='/announce' element={<PrivateRoute><Announce /></PrivateRoute>}/>
        </Routes>
        <ToastContainer position="top-right" />
      </div>
    </div>
  )
}

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => { 
      setUser(user)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{user, loading}}>
      <AppContent />
    </AuthContext.Provider>
  )
}

export default App