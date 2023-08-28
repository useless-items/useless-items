
import { Routes, Route, Link } from "react-router-dom"
import Home from "./Components/Home.jsx"
import User from "./Components/User.jsx"
import Cart from "./Components/Cart.jsx"
import Register from "./Components/Register.jsx"

const App = () => {
 
  return (
    <>
      <div id="container">
        <h1></h1>
        <div id="navbar">
          <Link to="/">
            Home
          </Link>
          <Link to="/login">
            User Login
          </Link>
          <Link to="/cart">
            Shopping Cart
          </Link>
          <Link to="/register">
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
