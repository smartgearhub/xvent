import React, { useState } from 'react';
import './Navbar.css';
import { FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="navbar">
      <nav className="nav-container">
        <div className="nav-left">
          <a href="#" className="logo">Xvent</a>
        </div>
        <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <a href="#hero" onClick={(e) => handleScrollTo(e, 'hero')}>Home</a>
          <a href="#features" onClick={(e) => handleScrollTo(e, 'features')}>Features</a>
          <a href="#event-discovery" onClick={(e) => handleScrollTo(e, 'event-discovery')}>Discover Events</a>
          <a href="#talent-showcase" onClick={(e) => handleScrollTo(e, 'talent-showcase')}>Showcase Talent</a>
          
          <a href="#how-it-works" onClick={(e) => handleScrollTo(e, 'how-it-works')}>How It Works</a>
          <button className="signup-btn" onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
        <FaBars className="hamburger-icon" onClick={toggleMenu} />
        {isMobileMenuOpen && (
          <div className="mobile-menu">
            <a href="#hero" onClick={(e) => handleScrollTo(e, 'hero')}>Home</a>
            <a href="#features" onClick={(e) => handleScrollTo(e, 'features')}>Features</a>
            <a href="#event-discovery" onClick={(e) => handleScrollTo(e, 'event-discovery')}>Discover Events</a>
            <a href="#talent-showcase" onClick={(e) => handleScrollTo(e, 'talent-showcase')}>Showcase Talent</a>
          
            <a href="#how-it-works" onClick={(e) => handleScrollTo(e, 'how-it-works')}>How It Works</a>
            <button className="signup-btn mobile" onClick={() => navigate('/signup')}>Sign Up</button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
