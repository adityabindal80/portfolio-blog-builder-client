import React from 'react';
import '../styles/Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer text-center bg-dark px-4">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} Portfolio Builder. All rights reserved.</p>
        <div className="footer-links">
          <Link className='mx-3' to="/about">About</Link>
          <Link  className='mx-3' to="/feedback">Feedback</Link>
          <a className='mx-3' href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
