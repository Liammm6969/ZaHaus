import React, { useState } from "react";
import "../styles/AllProductMenu.css";
import Navbar from "./Navbar";

const products = [
  {
    id: 1,
    name: "Nike Air Monarch IV",
    category: "Men's Workout Shoes",
    price: 2595,
    image: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,q_auto:eco/2b2e6c6d-2e3e-4e7e-8e3c-7e2e6c6d2e3e/air-monarch-iv-mens-training-shoe-KkLcGR.png",
  },
  {
    id: 2,
    name: "Nike V2K Run",
    category: "Men's Shoes",
    price: 6895,
    image: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,q_auto:eco/1e1e6c6d-2e3e-4e7e-8e3c-7e2e6c6d2e3e/v2k-run-mens-shoes-123456.png",
  },
  {
    id: 3,
    name: "Nike Zoom Vomero 5",
    category: "Men's Shoes",
    price: 8895,
    image: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,q_auto:eco/3e3e6c6d-2e3e-4e7e-8e3c-7e2e6c6d2e3e/zoom-vomero-5-mens-shoes-654321.png",
  },
  {
    id: 4,
    name: "Nike V2K Run",
    category: "Women's Shoes",
    price: 6895,
    image: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,q_auto:eco/4e4e6c6d-2e3e-4e7e-8e3c-7e2e6c6d2e3e/v2k-run-womens-shoes-789012.png",
  },
  {
    id: 5,
    name: "Nike V2K Run",
    category: "Men's Shoes",
    price: 6895,
    image: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,q_auto:eco/5e5e6c6d-2e3e-4e7e-8e3c-7e2e6c6d2e3e/v2k-run-mens-shoes-345678.png",
  },
  // Add more products as needed
];

export default function AllProductMenu() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  const handleBuyNow = (product) => {
    alert(`Proceeding to buy: ${product.name}`);
  };

  return (
    <div className="all-product-menu-container">
        <Navbar />
      <div className="all-product-menu-header">
        <h2>Products</h2>
        <div className="all-product-menu-actions">
          <button className="filter-btn">
            <span>☰</span> Filters: All
          </button>
          <select className="sort-select">
            <option>Sort by: Featured</option>
          </select>
        </div>
      </div>
      <div className="all-product-menu-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="product-img-container">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-info">
              <div className="product-name">{product.name}</div>
              <div className="product-category">{product.category}</div>
              <div className="product-price">₱{product.price.toLocaleString()}</div>
              <div className="product-actions">
                <button className="add-cart-btn" onClick={() => handleAddToCart(product)}>
                  Add to cart
                </button>
                <button className="buy-now-btn" onClick={() => handleBuyNow(product)}>
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}