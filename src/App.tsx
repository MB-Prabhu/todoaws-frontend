import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ProtectedRoutesAWS from './components/ProtectedRoutesAWS'
import NavbarAWS from './components/NavbarAWS'
import About from './pages/About'
import Contact from './pages/Contact'
import LoginAWS from './pages/LoginAWS'

const App:React.FC = () => {
  return (
    <>
      <NavbarAWS />
      
      <Routes>
      <Route path="/" element={<LoginAWS />} />
      <Route path="/home" element={<ProtectedRoutesAWS element={<Home />} />} />
      <Route path="/about" element={<ProtectedRoutesAWS element={<About />} />} />
      <Route path="/contact" element={<ProtectedRoutesAWS element={<Contact />} />} />
    </Routes>
    </>
  )
}

export default App