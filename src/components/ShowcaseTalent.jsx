import React from 'react';
import './ShowcaseTalent.css';

const ShowcaseTalent = () => {
  return (
    <section id="talent-showcase" className="talent-section">
      <div className="talent-container">
        <div className="talent-header">
          <h2>Showcase Your Talent to the Right Audience</h2>
          <p>Create a stunning profile and get noticed by event organizers.</p>
        </div>

        <div className="talent-card">
          <div className="icon pink">
            <i className="fas fa-microphone"></i>
          </div>
          <h3>Talent Showcase</h3>
          <p>
            Create an impressive profile to highlight your skills and connect with event organizers.
          </p>
          <ul>
            <li>Portfolio display</li>
            <li>Skills categorization</li>
            <li>Direct messaging</li>
          </ul>
          <a href="#">Showcase Your Talent →</a>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseTalent;
