import { Routes, Route, Link } from "react-router-dom"
import Home from "./Components/Home.jsx"
import User from "./Components/User.jsx"
import Cart from "./Components/Cart.jsx"
import Register from "./Components/Register.jsx"

const App = () => {
 
  return (
    <>
      <div id="container">
          <div id= "MainHeading-container">
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
            <Route path="/login" element={<User />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
     </>

  )
}

export default App
