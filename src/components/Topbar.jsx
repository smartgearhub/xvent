import React, { useState } from 'react';
import SearchBar from './SearchBar';
import './Topbar.css';
import { getAuth, signOut } from "firebase/auth";

import {
  FaHome,
  FaBell,
  FaBars,
  FaUserCircle,
  FaUser,
  FaEdit,
  FaCalendarAlt,
  FaEnvelope,
  FaCog,
  FaSignOutAlt,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

const handleLogout = () => {
  signOut(auth)
    .then(() => {
      console.log("User signed out");
      navigate("/Login"); // Redirect to login page
    })
    .catch((error) => {
      console.error("Sign-out error:", error);
    });
};


  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMobileMenuOpen(false); // Close mobile menu after navigation
    setProfileDropdownOpen(false); // Close profile dropdown after navigation
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1 className="logo">Xvent</h1>
      </div>

      <SearchBar />

      <div className="topbar-right">
        <div className="desktop-icons">
          <FaHome
            className="topbar-icon"
            title="Home"
            onClick={() => handleNavigation('/Dashboard')}
          />
          <FaBell
            className="topbar-icon"
            title="Notifications"
            onClick={() => handleNavigation('/notifications')}
          />
        </div>

        <div className="profile-section">
          <FaUserCircle
            className="topbar-icon"
            title="Profile"
            onClick={toggleProfileDropdown}
          />

          {profileDropdownOpen && (
            <div className="profile-dropdown">
              <button onClick={() => handleNavigation('/profile')}>View Profile</button>
              <button onClick={handleLogout}>Logout</button>

            </div>
          )}
        </div>

        <FaBars className="hamburger-icon" onClick={toggleMobileMenu} />

        {mobileMenuOpen && (
          <div className="mobile-menu">
            <div className="mobile-link" onClick={() => handleNavigation('/Dashboard')}>
              <FaHome className="topbar-icon" /> Home
              
            </div>
            
            <div className="mobile-link" onClick={() => handleNavigation('/profile')}>
              <FaUser className="topbar-icon" /> My Profile
            </div>
            <div className="mobile-link" onClick={() => handleNavigation('/myposts')}>
              <FaEdit className="topbar-icon" /> My Posts
            </div>
            <div className="mobile-link" onClick={() => handleNavigation('/discover-events')}>
              <FaCalendarAlt className="topbar-icon" /> Discover Events
            </div>
            <div className="mobile-link" onClick={() => handleNavigation('/messages')}>
              <FaEnvelope className="topbar-icon" /> Messages
            </div>
            <div className="mobile-link" onClick={() => handleNavigation('/notifications')}>
              <FaBell className="topbar-icon" /> Notifications
            </div>
            <div className="mobile-link" onClick={() => handleNavigation('/settings')}>
              <FaCog className="topbar-icon" /> Settings
            </div>
            <div className="mobile-link" onClick={() => handleNavigation('/Signup')}>
              <FaSignOutAlt className="topbar-icon" /> Logout
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Topbar;
