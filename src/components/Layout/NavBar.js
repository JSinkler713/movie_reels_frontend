import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import {UserContext} from '../../UserContext'

const uid = localStorage.getItem('uid')
console.log(uid)
const NavBar = ({ logout }) => {
  const [user, setUser] = useContext(UserContext)
  const links = ( 
    <>  
      <li className="nav-item">
        <NavLink className="nav-link" exact to="/">Home</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/login">Login</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/register">Register</NavLink>
      </li>
    </> 
  );  
  
  const authLinks = ( 
    <>  
      <li className="nav-item">
        <NavLink className="nav-link" exact to="/">Home</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" exact to="/profile">Profile</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/reels">Reels</NavLink>
      </li>
      <li className="nav-item">
        <span className="nav-link" style={{cursor: 'pointer'}} onClick={logout}>Logout</span>
      </li>
    </> 
  );  

  return (
      <div className="app-container">
        <div className='reel-holder'>
          <img className='reel-image' src="https://www.seekpng.com/png/detail/10-109199_lights-camera-action-movie-reel-transparent-background.png" alt="Lights, Camera, Action - Movie Reel Transparent Background@seekpng.com" />
        </div>
        <div className='title-container'>
          <h1 className="title">MOVIE_REELS</h1>
        </div>
        <div className="links-container">
            <ul className="links">
            { user.userId ? authLinks : links }
            </ul>
        </div>
      </div>
  );  
};

export default NavBar;
