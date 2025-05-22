import React from 'react';
import '../styles/LandingPage.css';
import pizza from '../pictures/landingpage.png'
import toppings from '../pictures/toppings.png';
import { Instagram, Facebook, Twitter, Star, ExternalLink, Github } from 'lucide-react';
import { Button } from '@mui/material';

function LandingPage() {
  return (
    <div className="landing-container">
      {/* Navigation Bar */}
      <header className="navbar">
        <div className="logo-container">
          <div className="logo-circle"></div>
          <span className="logo-text">Crave</span>
        </div>
        
        <nav className="nav-links">
          <a href="#" className="nav-link active">Home</a>
          <a href="#" className="nav-link">Menu</a>
          <a href="#" className="nav-link">About us</a>
          <a href="#" className="nav-link">Reservation</a>
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

      {/* Main Content */}
      <div className="main-content-ref">
        {/* Left Column */}
        <div className="left-col">
          <div className="review-row">
          </div>
          <div className="pizza-social-wrapper">
          <div className="social-bar-flush">
              <div className="social-icons-vertical">
                <a href="https://www.instagram.com/liam2104" target='_blank' className="social-icon"><Instagram size={22} /></a>
                <a href="https://www.facebook.com/Liam2104" target='_blank' className="social-icon"><Facebook size={22} /></a>
                <a href="https://github.com/Liammm6969" target="_blank" rel="noopener noreferrer" className="social-icon"><Github size={22} /></a>
              </div>
              <span className="follow-label-flush">FOLLOW US:</span>
            </div>
            <div className="pizza-image-ref">
              <img src={pizza} alt="Delicious pizza slice" />
            </div>
          </div>
        </div>
        {/* Right Column */}
        <div className="right-col">
          <div className="slogan-order-wrapper">
            <h1 className="italian-slogan-ref">
              Where Every Slice<br />Feels Like Home.
            </h1>
            <Button 
              variant="contained" 
              color="primary"
              className="order-button-ref"
              endIcon={<ExternalLink />}
            >
              Order now
            </Button>
            <div className="toppings-floating-container">
              <img src={toppings} alt="Topping" className="topping-float topping-float-1" />
            </div>
          </div>
            <div className="floating-ingredients-pixel">
                <div className="ingredient-svg ingredient-svg-1"></div>
                <div className="ingredient-svg ingredient-svg-2"></div>
                <div className="ingredient-svg ingredient-svg-3"></div>
                <div className="ingredient-svg ingredient-svg-4"></div>
            </div>
          <div className="ratings-section-ref ratings-section-pixel">
            <div className="rating-header-ref">
              <span className="rating-count">25k+ Rating</span>
              <span className="rating-line"></span>
              <div className="rating-score">
                <Star className="rating-star" size={20} color="#ffc107" fill="#ffc107" />
                <span className="rating-number">4.5</span>
              </div>
            </div>
            <p className="description-text">
              Our pizzas are made with fresh, high-quality ingredients and cooked to perfection. Design by Fluttertop. Enjoy a tasty and healthy meal with every bite.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;