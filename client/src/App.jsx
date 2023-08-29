import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Components/Home.jsx';
import Login from './Components/Login.jsx';
import Cart from './Components/Cart.jsx';
import Register from './Components/Register.jsx';
import Checkout from './Components/Checkout.jsx';
import { useState } from 'react';

const App = () => {
  const [token, setToken] = useState("");

  return (
    <>
      <div id="container">
        <div id="MainHeading-container">
          <h1 id="MainHeading">List of Useless Items</h1>
        </div>
        <div id="navbar">
          <Link to="/" className="linkstyle">
            Home
          </Link>
          <Link to="/login" className="linkstyle">
            User Login
          </Link>
          <Link to="/cart" className="linkstyle">
            Shopping Cart
          </Link>
          <Link to="/register" className="linkstyle">
            New User Registration
          </Link>
        </div>
        <div id="main-section">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setToken={setToken}/>} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/register" element={<Register setToken={setToken} />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

// Define dummy cart items and total price here
const dummyCartItems = [
  {
    id: 1,
    productName: 'Item 1',
    productImgUrl: 'image-url-1',
    price: 10.99,
  },
  {
    id: 2,
    productName: 'Item 2',
    productImgUrl: 'image-url-2',
    price: 15.99,
  },
  // ... add more items
];

const dummyTotalPrice = 26.98; // Example total price

export default App;
