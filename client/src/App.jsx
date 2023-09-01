import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Components/Home.jsx';
import Login from './Components/Login.jsx';
import Cart from './Components/Cart.jsx';
import UserPortal from './Components/UserPortal.jsx';
import Register from './Components/Register.jsx';
import Checkout from './Components/Checkout.jsx';
import Admin from './Components/Admin.jsx';
import ProductForm from './Components/ProductForm.jsx';

const App = () => {
  
  const [token, setToken] = useState(null);

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
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setToken={setToken}/>} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/register" element={<Register setToken={setToken} />} />
            <Route path="/users" element={<Admin token={token}/>}/>
            <Route path="/admin/post-product" element={<ProductForm />} />

          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
