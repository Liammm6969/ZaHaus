import React from 'react';
import '../styles/LandingPage.css';
import { Button } from '@mui/material';
import margherita from '/src/pictures/margherita.jpg';
import pepperoni from '/src/pictures/pepperoni.jpg';
import hawaiian from '/src/pictures/hawaiian.jpg';

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

function MenuPage() {
  return (
    <div className="menu-section-bg">
      <h2 className="menu-section-title">Our Popular Dishes</h2>
      <div className="menu-cards-row">
        {dishes.map((dish, idx) => (
          <div className="menu-card" key={idx}>
            <img className="menu-card-img" src={dish.img} alt={dish.name} />
            <div className="menu-card-title">{dish.name}</div>
            <div className="menu-card-info-row">
              <span className="menu-card-cal">{dish.cal}</span>
              <span className="menu-card-dot">•</span>
              <span className="menu-card-rating">{dish.rating}★</span>
              <span className="menu-card-dot">•</span>
              <span className="menu-card-reviews">{dish.reviews} Reviews</span>
            </div>
            <Button variant="contained" className="menu-card-btn">Order Now</Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuPage; 