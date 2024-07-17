import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import custom CSS

const Navbar = ({ employeeId }) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light text-black">
        <Link className="navbar-brand" to="#">
          <img
            src="/images/worksuite_img.png"
            alt="Worksuite Logo"
            style={{ height: '40px' }} // Adjust the height as needed
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link text-black" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-black" to={`/tour-plan/${employeeId}`}>
                Tour Plan
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-black" to={`/dcr/${employeeId}`}>
                DCR
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
