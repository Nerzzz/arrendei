import { Routes, Route, useLocation } from 'react-router'

import Header from './components/Header'
import Feed from './pages/Feed'
import Login from './pages/Login'
import Register from './pages/Register'

function AppContent(){
  const location = useLocation()
  let hideHeader = false
  if(location.pathname === "/login" || location.pathname === "/register") hideHeader = true
  return(
    <>
      {!hideHeader && <Header />}
      <Routes>
        <Route path='/' element={<Feed />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
      </Routes>
    </>
  )
}

function App() {
  return (
    AppContent()
  )
}

export default App