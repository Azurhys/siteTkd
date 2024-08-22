import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg" style={{ background: 'linear-gradient(to right, #ff0000, #0000ff)' }}  >
        <img className="navbar-brand" src={'/logo.png'} alt="Logo de l'USM" style={{width : '5%'}} /> 
        <div className="collapse navbar-collapse" id="navbarNav" >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link text-white fs-2 mx-5" to="/" exact>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white fs-2 mx-5" to="/about">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white fs-2 mx-5" to="/services">Services</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white fs-2 mx-5" to="/contact">Contact</NavLink>
            </li>
          </ul>
        
      </div>
    </nav>
  );
}

export default Navbar;
