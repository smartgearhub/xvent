import React from 'react';
import './HowItWorks.css';
import { FaUser, FaPen, FaBell, FaSmile, FaSearch, FaClock, FaLock, FaComments } from 'react-icons/fa';
const steps = [
  {
    icon: <FaUser />,
    title: 'Create Account',
    desc: 'Quick 2-minute signup',
  },
  {
    icon: <FaPen />,
    title: 'Create or Find',
    desc: 'Post events or discover them',
  },
  {
    icon: <FaBell />,
    title: 'Connect',
    desc: 'Book or manage events',
  },
  {
    icon: <FaSmile />,
    title: 'Enjoy',
    desc: 'Experience great events',
  },
];

const features = [
  {
    icon: <FaSearch />,
    title: 'Smart Discovery',
    desc: 'Find events that match your interests with our AI-powered recommendation engine.',
  },
  {
    icon: <FaClock />,
    title: 'Real-Time Updates',
    desc: 'Stay informed with instant notifications about event changes or new opportunities.',
  },
  {
    icon: <FaLock />,
    title: 'Secure Payments',
    desc: 'Book tickets with confidence using our encrypted payment processing system.',
  },
  {
    icon: <FaComments />,
    title: 'Direct Messaging',
    desc: 'Connect directly with event organizers or talent with our built-in messaging system.',
  },
];


const HowItWorks = () => {
  return (
    <section id="how-it-works" className="how-section">
      <div className="how-container">
        <div className="how-header">
          <h2>How Xvent Works</h2>
          <p>
            Whether you're an event seeker, talent, or organizer, Xvent is simple and powerful to use.
          </p>
        </div>

        <div className="how-steps">
          {/* Step 1 */}
          <div className="step-card">
            <div className="step-icon purple">
              <i className="fas fa-user-plus"></i>
            </div>
            <h3>Create Your Profile</h3>
            <p>Sign up and set up your personalized profile as an attendee, talent, or organizer.</p>
          </div>

          {/* Step 2 */}
          <div className="step-card">
            <div className="step-icon pink">
              <i className="fas fa-search"></i>
            </div>
            <h3>Find or Post Events</h3>
            <p>Discover events near you or create your own with our easy-to-use tools.</p>
          </div>

          {/* Step 3 */}
          <div className="step-card">
            <div className="step-icon green">
              <i className="fas fa-calendar-check"></i>
            </div>
            <h3>Join and Engage</h3>
            <p>Attend, perform, or organize — Xvent helps you connect and grow your network.</p>
          </div>
        </div>
      </div>
      <div className="how-it-works-container">
        <div className="steps-section">
          {steps.map((step, index) => (
            <div key={index} className="step-card">
              <div className="icon">{step.icon}</div>
              <h4>{step.title}</h4>
              <p>{step.desc}</p>
              {index !== steps.length - 1 && <div className="arrow">→</div>}
            </div>
          ))}
        </div>

        <div className="features-section">
          {features.map((feature, index) => (
            <div key={index} className="feature-box">
              <div className="feature-icon">{feature.icon}</div>
              <div>
                <h5>{feature.title}</h5>
                <p>{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="reviews-section">
        <h2>What Our Users Say</h2>
        <p className="subheading">
          Hear from event organizers, talents, and attendees who've transformed their experience with Xvent.
        </p>

        {/* Main Large Review Card */}
        <div className="main-review card hover-effect">
          <img src="https://via.placeholder.com/192" alt="user" className="main-avatar" />
          <div className="main-review-content">
            <p className="quote">❝</p>
            <p className="highlight">
              “As a festival director organizing multiple events each year, Xvent has been a game-changer. Their platform streamlined our ticketing process and increased our attendance by 35% in just one season.”
            </p>
            <p className="details">
              After struggling with fragmented tools and platforms, Michael discovered Xvent and now manages all his festival operations in one place, reaching a larger audience than ever before.
            </p>
            <div className="reviewer-info">
              <strong>Michael Rodriguez</strong>
              <span>Festival Director</span>
            </div>
          </div>
        </div>

        {/* Three Small Review Cards */}
        <div className="review-grid">
          <div className="card small-review hover-effect">
            <img src="https://via.placeholder.com/64" alt="Sarah" className="avatar" />
            <div>
              <strong>Sarah Chen</strong>
              <p className="role">Musician & Performer</p>
              <p className="stars">★★★★★</p>
              <p className="text">
                "My talent profile on Xvent has connected me with venue owners I never would have met otherwise. In just six months, I've booked 12 paid gigs through the platform."
              </p>
              <p className="joined">Using Xvent since March 2023</p>
            </div>
          </div>

          <div className="card small-review hover-effect">
            <img src="https://via.placeholder.com/64" alt="James" className="avatar" />
            <div>
              <strong>James Wilson</strong>
              <p className="role">Event Enthusiast</p>
              <p className="stars">★★★★★</p>
              <p className="text">
                "I've discovered amazing local events I never knew existed. The filter options make it so easy to find exactly what I’m looking for based on my interests and availability."
              </p>
              <p className="joined">Using Xvent since June 2022</p>
            </div>
          </div>

          <div className="card small-review hover-effect">
            <img src="https://via.placeholder.com/64" alt="Priya" className="avatar" />
            <div>
              <strong>Priya Sharma</strong>
              <p className="role">Small Business Owner</p>
              <p className="stars">★★★★★</p>
              <p className="text">
                "Our workshop attendance doubled after we started using Xvent. The platform’s promotion tools and targeted reach helped us connect with people genuinely interested in our offerings."
              </p>
              <p className="joined">Using Xvent since January 2023</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
  );
};

export default HowItWorks;
