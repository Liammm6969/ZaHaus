import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LandingPage from './pages/LandingPage'
import AllProductMenu from './pages/AllProductMenu'
import LocationSection from './pages/LocationSection'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<AllProductMenu />} />
        <Route path="/location" element={<LocationSection />} />
      </Routes>
    </Router>
  )
}

export default App