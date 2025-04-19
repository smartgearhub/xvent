import React from 'react';
import './Features.css';
import { useNavigate } from 'react-router-dom';
const Features = () => {
  const navigate = useNavigate();
  return (
    <section id="features" className="features-section">
      <div className="features-container">
        <div className="features-header">
          <h2>Connecting Events, Talent, and Audiences</h2>
          <p>
            Xvent simplifies how events are discovered, promoted, and experienced with powerful features for every user.
          </p>
        </div>

        <div className="features-grid">
          {/* Feature 1 */}
          <div className="feature-card">
            <div className="feature-icon purple">
              <i className="fas fa-calendar-day"></i>
            </div>
            <h3>Smart Event Discovery</h3>
            <p>Find events that match your interests with personalized recommendations and advanced filters.</p>
            <ul>
              <li>Location-based search</li>
              <li>Category filtering</li>
              <li>Personalized recommendations</li>
            </ul>
            <a href="#event-discovery">Explore Events →</a>
          </div>

          {/* Feature 2 */}
          <div className="feature-card">
            <div className="feature-icon pink">
              <i className="fas fa-microphone"></i>
            </div>
            <h3>Talent Showcase</h3>
            <p>Create an impressive profile to highlight your skills and connect with event organizers.</p>
            <ul>
              <li>Portfolio display</li>
              <li>Skills categorization</li>
              <li>Direct messaging</li>
            </ul>
            <a href="#talent-showcase">Showcase Your Talent →</a>
          </div>

          {/* Feature 3 */}
          <div className="feature-card">
            <div className="feature-icon green">
              <i className="fas fa-bullhorn"></i>
            </div>
            <h3>Event Management</h3>
            <p>Powerful tools for organizers to create, promote, and manage events with ease.</p>
            <ul>
              <li>Easy event creation</li>
              <li>Ticket management</li>
              <li>Attendee analytics</li>
            </ul>
            <a href="#organizer-tools">Organize Events →</a>
          </div>

          {/* Feature 4 */}
          <div className="feature-card">
            <div className="feature-icon purple">
              <i className="fas fa-clock"></i>
            </div>
            <h3>Virtual Events</h3>
            <p>Host and attend online events with our integrated streaming and interactive tools.</p>
            <ul>
              <li>HD streaming</li>
              <li>Live chat & Q&A</li>
              <li>Recording & playback</li>
            </ul>
            <a href="#virtual-events">Explore Virtual Events →</a>
          </div>

          {/* Feature 5 */}
          <div className="feature-card">
            <div className="feature-icon pink">
              <i className="fas fa-bell"></i>
            </div>
            <h3>Real-Time Updates</h3>
            <p>Stay informed with instant notifications about events you're interested in or changes to your bookings.</p>
            <ul>
              <li>Event reminders</li>
              <li>Schedule changes</li>
              <li>New event alerts</li>
            </ul>
            <a href="#notifications">Learn More →</a>
          </div>

          {/* Feature 6 */}
          <div className="feature-card">
            <div className="feature-icon green">
              <i className="fas fa-share-alt"></i>
            </div>
            <h3>Social Integration</h3>
            <p>Share events easily with your network and promote your events across platforms.</p>
            <ul>
              <li>One-click sharing</li>
              <li>Custom sharing messages</li>
              <li>Social engagement tracking</li>
            </ul>
            <a href="#social-sharing">Learn More →</a>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="features-cta">
          <div>
            <h3>Ready to Discover Amazing Events?</h3>
            <p>Join thousands of users already connecting through Xvent.</p>
          </div>
          <div className="cta-buttons">
            <a onClick={() => navigate('/signup')}>Create Account</a>
            <a onClick={() => navigate('/signup')} className="transparent">Learn More</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
