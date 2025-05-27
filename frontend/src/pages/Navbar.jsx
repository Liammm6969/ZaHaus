import React from 'react'
import '../styles/Navbar.css'
function Navbar() {
  return (
    <div>
        <header className="navbar">
        <div className="logo-container">
          <div className="logo-circle"></div>
          <span className="logo-text">Crave</span>
        </div>
        
        <nav className="nav-links">
          <a href="/" className="nav-link active">Home</a>
          <a href="/products" className="nav-link">Menu</a>
          <a href="#" className="nav-link">About us</a>
          <a href="/location" className="nav-link">Location</a>
          <a href="#" className="nav-link">Blog</a>
        </nav>
        
        <div className="nav-actions">
          <button className="icon-btn search-btn">
            {/* You can use Lucide's Search icon here if desired */}
          </button>
          <button className="icon-btn account-btn">
            {/* You can use Lucide's User icon here if desired */}
          </button>
          <button className="cart-btn">
            {/* You can use Lucide's ShoppingCart icon here if desired */}
            <span className="cart-badge">3</span>
          </button>
          
        </div>
      </header>
    </div>
  )
}

export default Navbar