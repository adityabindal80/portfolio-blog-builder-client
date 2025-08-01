import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoggedInNavbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const firstLetter = user?.charAt(0).toUpperCase() || '?';

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{ fontWeight: 'bold' }}>
        <span className="fw-bold" style={{ fontSize: '1.3rem' }}>#StageFolio</span> - <small className="" style={{ fontSize: '0.8rem', letterSpacing: '.3px' }}>Showcase Your Work, Share Your Voice.</small>
        </Link>

        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav align-items-center">
            <li className="nav-item">
            <Link className="nav-link" to={`/user/${user}`}>My Portfolio</Link>

            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/blogs/user.id">My Blogs</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/feedback">Feedback</Link>
            </li>
            <li className="nav-item ms-3">
              <div
                className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                style={{ width: '40px', height: '40px', fontWeight: 'bold', cursor: 'pointer' }}
                onClick={() => navigate(`/user/${user?.username}`)} // ✅ correct

              >
                {firstLetter}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default LoggedInNavbar;
