import { Routes, Route, Link } from "react-router-dom";
import Home from './components/Home';
import Register from './components/Register';

const App = () => {
 
  return (
    <>
      <div id='navbar' className='navbar'>
        <Link to='/' className='navbar-link'><button className='home'>Home</button></Link>
        <Link to='/register' className='navbar-link'><button className='register'>Register</button></Link>
      </div>
      
      <Routes>
        <Route path='/' element={ < Home />}></Route>
        <Route path='/register' element={ <Register />}></Route>
      </Routes>
    </>
  )
}

export default App
