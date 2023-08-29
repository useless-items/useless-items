import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Components/Home.jsx';
import Login from './Components/Login.jsx';
import Cart from './Components/Cart.jsx';
import Register from './Components/Register.jsx';

const App = () => {
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
            <Route path="/login" element={<Login />} />
            {/* Pass cartItems and totalPrice to Cart component */}
            <Route
              path="/cart"
              element={
                <Cart
                  cartItems={dummyCartItems}
                  totalPrice={dummyTotalPrice}
                />
              }
            />
            <Route path="/register" element={<Register />} />
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
