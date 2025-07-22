import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LandingPage from './pages/LandingPage'
import AllProductMenu from './pages/AllProductMenu'
import LocationSection from './pages/LocationSection'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProtectedRoute from './components/ProtectedRoute'
import Checkout from './pages/Checkout'
import UserManagementPage from './pages/UserManagementPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/" element={<Signup />} />
        <Route path="/" element={<LandingPage />} />
        
        {/* Protected Routes */}
        <Route 
          path="/products" 
          element={
            <ProtectedRoute allowedRoles={['admin', 'staff', 'customer']}>
              <AllProductMenu />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/location" 
          element={
            <ProtectedRoute allowedRoles={['admin', 'staff', 'customer']}>
              <LocationSection />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/checkout" 
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/users" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <UserManagementPage />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  )
}

export default App