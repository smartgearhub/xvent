import React from 'react';
import './ForOrganizers.css';

const ForOrganizers = () => {
  return (
    <section id="organizer-tools" className="organizer-section">
      <div className="organizer-container">
        <div className="organizer-header">
          <h2>Powerful Tools for Event Organizers</h2>
          <p>Manage and promote your events easily with Xvent's organizer features.</p>
        </div>

        <div className="organizer-card">
          <div className="icon green">
            <i className="fas fa-bullhorn"></i>
          </div>
          <h3>Event Management</h3>
          <p>
            Powerful tools for organizers to create, promote, and manage events with ease.
          </p>
          <ul>
            <li>Easy event creation</li>
            <li>Ticket management</li>
            <li>Attendee analytics</li>
          </ul>
          <a href="#">Organize Events →</a>
        </div>
      </div>
    </section>
  );
};

export default ForOrganizers;
