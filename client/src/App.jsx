import { Routes, Route, useLocation } from 'react-router'
import { ToastContainer } from "react-toastify"

import Header from './components/Header'
import Feed from './pages/Feed'
import Login from './pages/Login'
import Register from './pages/Register'

import 'react-toastify/dist/ReactToastify.css'

function AppContent(){
  const location = useLocation()
  const hideHeader = location.pathname === "/login" || location.pathname === "/register"

  return(
    <div className="min-h-screen flex flex-col">
      {!hideHeader && <Header />}

      <div className="flex-1">
        <Routes>
          <Route path='/' element={<Feed />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
        </Routes>
      </div>

      <ToastContainer position="top-center" />
    </div>
  )
}

function App() {
  return (
    <AppContent />
  )
}

export default App