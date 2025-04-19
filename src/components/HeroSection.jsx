import React from 'react';
import './HeroSection.css';
import { useNavigate } from 'react-router-dom';
const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section id="hero" className="hero">
      <div className="hero-container">
        <div className="hero-left">
          <h1>Discover & Connect With Local Events</h1>
          <p>
            Xvent brings together event organizers, talented performers, and attendees on one platform.
            Find, promote, or participate in events that matter to you.
          </p>
          <div className="hero-buttons">
            <a href="#event-discovery" className="btn-discover">Discover Events</a>
            <a onClick={() => navigate('/signup')} className="btn-post">Post an Event</a>
          </div>
        </div>
        <div className="hero-right">
          <div className="image-container">
            <img
              src="images/placehold.co-600x400"
              alt="People enjoying a local event"
              onError={(e) => {
                e.target.src = 'https://placehold.co/600x400';
              }}
            />
            <div className="event-card">
              <div className="card-header">
                <div className="calendar-icon">
                  <i className="fas fa-calendar-day"></i>
                </div>
                <span className="card-title">Music Festival</span>
              </div>
              <p className="card-location">Downtown Arts Center</p>
              <div className="card-footer">
                <span className="card-date">July 15</span>
                <span className="card-tag">Popular</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-stats">
        <div className="stat-box">
          <p className="stat-num">1000+</p>
          <p className="stat-label">Monthly Events</p>
        </div>
        <div className="stat-box">
          <p className="stat-num">5000+</p>
          <p className="stat-label">Active Users</p>
        </div>
        <div className="stat-box">
          <p className="stat-num">800+</p>
          <p className="stat-label">Talent Profiles</p>
        </div>
        <div className="stat-box">
          <p className="stat-num">50+</p>
          <p className="stat-label">Cities Covered</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
