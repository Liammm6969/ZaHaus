import React from 'react';
import '../styles/LandingPage.css';
import pizza from '../pictures/landingpage.png'
import toppings from '../pictures/toppings.png';
import grid from '../pictures/grid.png';
import { Instagram, Facebook, Twitter, Star, ExternalLink, Github, Users, Award, Heart, Clock, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '@mui/material';
import margherita from '../pictures/margherita.jpg';
import pepperoni from '../pictures/pepperoni.jpg';
import hawaiian from '../pictures/hawaiian.jpg';
import featuredPizza from '../pictures/featuredPizza.png';
import Navbar from './Navbar';
import { motion } from 'framer-motion';

const dishes = [
  {
    name: 'Margherita Pizza',
    img: margherita,
    cal: '214 Cal',
    rating: '4.9',
    reviews: '5.8k',
  },
  {
    name: 'Pepperoni Pizza',
    img: pepperoni,
    cal: '214 Cal',
    rating: '4.8',
    reviews: '4.2k',
  },
  {
    name: 'Hawaiian Pizza',
    img: hawaiian,
    cal: '214 Cal',
    rating: '4.7',
    reviews: '3.5k',
  },
];

function LandingPage() {
  return (
    <div className="landing-container">
      <img src={grid} alt="Grid" className="grid-bg-element" />
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content */}
      <motion.div 
        className="main-content-ref"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        {/* Left Column */}
        <div className="left-col">
          <div className="review-row">
          </div>
          <motion.div 
            className="pizza-social-wrapper"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
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
          </motion.div>
        </div>
        {/* Right Column */}
        <motion.div 
          className="right-col"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="slogan-order-wrapper">
            <h1 className="italian-slogan-ref">
              Where Every Slice<br />Feels Like Home.
            </h1>
            <Button 
              variant="contained" 
              color="primary"
              className="order-button-ref"
              endIcon={<ExternalLink />}
              onClick={() => window.location.href = '/products'}
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
              Our pizzas are made with fresh, high-quality ingredients and cooked to perfection. Enjoy a tasty and healthy meal with every bite.
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Pizza Cookie Promo Section */}
      <motion.div
        className="pizza-cookie-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <div className="pizza-cookie-content">
          <h2 className="pizza-cookie-title">
            Our customer's pizza<br />Pepperoni Pizza
          </h2>
          <div className="pizza-cookie-quote">
            <span>"</span>
          </div>
        </div>
        <div className="pizza-cookie-img-wrapper">
          <img
            src={featuredPizza}
            alt="Double Ice-cream deluxe cookie"
            className="pizza-cookie-img"
          />
        </div>
      </motion.div>

      {/* About Us Section */}
      <motion.div
        className="about-us-section"
        id='about'
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="about-us-container">
          <div className="about-us-header">
            <h2 className="about-us-title">About Our Story</h2>
            <p className="about-us-subtitle">
              Crafting authentic Italian flavors with passion since 2025
            </p>
          </div>
          <div className="about-us-content">
            <div className="about-us-text">
              <h3 className="about-us-story-title">From Italy to Your Table</h3>
              <p className="about-us-description">
                Our journey began in the heart of Naples, where our founder Giuseppe learned the ancient art of pizza making from his grandmother. Armed with traditional recipes passed down through generations, he brought authentic Italian flavors to create a place where every slice tells a story.
              </p>
              <p className="about-us-description">
                Today, we continue this legacy with the same passion, using only the finest imported ingredients and time-honored techniques to create pizzas that transport you straight to Italy with every bite.
              </p>
              <div className="about-us-stats">
                <div className="about-stat">
                  <div className="about-stat-icon">
                    <Award color="#fff" size={24} />
                  </div>
                  <h4 className="about-stat-number">40+</h4>
                  <p className="about-stat-label">Years Experience</p>
                </div>
                <div className="about-stat">
                  <div className="about-stat-icon">
                    <Users color="#fff" size={24} />
                  </div>
                  <h4 className="about-stat-number">50k+</h4>
                  <p className="about-stat-label">Happy Customers</p>
                </div>
                <div className="about-stat">
                  <div className="about-stat-icon">
                    <Heart color="#fff" size={24} />
                  </div>
                  <h4 className="about-stat-number">100%</h4>
                  <p className="about-stat-label">Made with Love</p>
                </div>
              </div>
            </div>
            <div className="about-us-image">
              <div className="chef-card">
                <h4 className="chef-name">Ninong Ry</h4>
                <p className="chef-title">Master Pizza Artisan</p>
              </div>
            </div>
          </div>
          <div className="about-us-promise">
            <div className="promise-bg-decoration promise-decoration-1"></div>
            <div className="promise-bg-decoration promise-decoration-2"></div>
            <div className="promise-content">
              <h3 className="promise-title">Our Promise to You</h3>
              <p className="promise-description">
                We promise to serve you authentic, fresh pizzas made with the finest ingredients, prepared by skilled hands, and delivered with the warmth of Italian hospitality. Every pizza is a celebration of tradition, quality, and the joy of sharing good food with good people.
              </p>
              <div className="promise-features">
                <div className="promise-feature">
                  <Clock size={24} />
                  <span>Fresh Daily</span>
                </div>
                <div className="promise-feature">
                  <Award size={24} />
                  <span>Premium Quality</span>
                </div>
                <div className="promise-feature">
                  <Heart size={24} />
                  <span>Made with Love</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Popular Dishes Section */}
      <motion.div
        className="menu-section-bg menu-section-bg-with-toppings"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="menu-section-title">Our Popular Dishes</h2>
        <div className="menu-cards-row">
          {dishes.map((dish, idx) => (
            <motion.div
              className="menu-card"
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
            >
              <img className="menu-card-img" src={dish.img} alt={dish.name} />
              <div className="menu-card-title">{dish.name}</div>
              <div className="menu-card-info-row">
                <span className="menu-card-cal">{dish.cal}</span>
                <span className="menu-card-dot">•</span>
                <span className="menu-card-rating">{dish.rating}★</span>
                <span className="menu-card-dot">•</span>
                <span className="menu-card-reviews">{dish.reviews} Reviews</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Footer Section */}
      <footer className="footer-section">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3 className="footer-logo">ZaHaus</h3>
              <p className="footer-description">
                Authentic Italian pizzas crafted with love and tradition. 
                Experience the taste of Italy in every bite, made with the finest ingredients and time-honored recipes.
              </p>
              <div className="footer-social-links">
                <a href="https://www.instagram.com/liam2104" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
                  <Instagram size={20} />
                </a>
                <a href="https://www.facebook.com/Liam2104" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
                  <Facebook size={20} />
                </a>
                <a href="https://github.com/Liammm6969" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
                  <Github size={20} />
                </a>
              </div>
            </div>
            <div className="footer-column">
              <h4 className="footer-column-title">Quick Links</h4>
              <div className="footer-links">
                <a href="#" className="footer-link">Home</a>
                <a href="#about" className="footer-link">About Us</a>
                <a href="/products" className="footer-link">Menu</a>
                <a href="/location" className="footer-link">Location</a>
              </div>
            </div>
            <div className="footer-column">
              <h4 className="footer-column-title">Customer Service</h4>
              <div className="footer-links">
                <a href="#" className="footer-link">Contact Us</a>
                <a href="#" className="footer-link">Order Online</a>
                <a href="#" className="footer-link">Delivery Info</a>
                <a href="#" className="footer-link">FAQ</a>
                <a href="#" className="footer-link">Reviews</a>
              </div>
            </div>
            <div className="footer-column">
              <h4 className="footer-column-title">Contact Info</h4>
              <div className="footer-contact-info">
                <div className="footer-contact-item">
                  <MapPin size={18} className="footer-contact-icon" />
                  <span>Bayombong<br />Nueva Vizcaya, Philippines</span>
                </div>
                <div className="footer-contact-item">
                  <Phone size={18} className="footer-contact-icon" />
                  <span>+63 939 737 4249</span>
                </div>
                <div className="footer-contact-item">
                  <Mail size={18} className="footer-contact-icon" />
                  <span>geriemarie18@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-copyright">
              © ZaHaus. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <a href="#" className="footer-bottom-link">Privacy Policy</a>
              <a href="#" className="footer-bottom-link">Terms of Service</a>
              <a href="#" className="footer-bottom-link">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;