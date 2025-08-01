import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/"> <span className="fw-bold" style={{ fontSize: '1.3rem' }}>#StageFolio</span> - <small className="" style={{ fontSize: '0.8rem', letterSpacing: '.3px' }}>Showcase Your Work, Share Your Voice.</small></Link>
        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav">

          <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Register</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
