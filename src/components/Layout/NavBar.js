import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = ({ currentUser, logout }) => {
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
        <div className='title-container'>
          <h1 className="title">MOVIE_REELS</h1>
        </div>
        <div className="links-container">
            <ul className="links">
            { currentUser ? authLinks : links }
            </ul>
        </div>
      </div>
  );  
};

export default NavBar;
