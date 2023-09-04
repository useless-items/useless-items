import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Components/Home.jsx';
import Login from './Components/Login.jsx';
import Cart from './Components/Cart.jsx';
import UserPortal from './Components/UserPortal.jsx';
import Register from './Components/Register.jsx';
import Checkout from './Components/Checkout.jsx';
import ProductForm from './Components/ProductForm.jsx';
import ProductDetails from './Components/ProductDetails.jsx';

const App = () => {
  
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [cartCounter, setCartCounter] = useState(0);

  const addToCart = async (product) => {
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
          pennies: product.pennies,
          shoppingCartId: product.id,
        }),
      });

      if (response.ok) {
        setCartItems([...cartItems, product]);
        setCartCounter(cartCounter + 1);
        console.log('Item added to cart successfully');
      } else {
        console.error('Error adding to cart');
      }

    } catch (error){
      console.error('Error adding to cart:', error);
    };
  }
  
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
          <Link to="/userportal" className="linkstyle">
            User Portal
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
            <Route path="/" element={<Home addToCart={addToCart} cartItems={cartItems} setCartItems={setCartItems} cartCounter={cartCounter} setCartCounter={setCartCounter}/>} />
            <Route path="/login" element={<Login setToken={setToken} setUserId={setUserId}/>} />
            <Route path="/cart" element={<Cart token={token} cartItems={cartItems} setCartItems={setCartItems} addToCart={addToCart} cartCounter={cartCounter} />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/register" element={<Register setToken={setToken} />} />
            <Route path="/userportal" element={<UserPortal token={token} userId={userId}/>}/>
            <Route path="/api/products" element={<ProductForm />} />

          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
