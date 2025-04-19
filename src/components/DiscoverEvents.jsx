import React from 'react';
import './DiscoverEvents.css';
import { useNavigate } from 'react-router-dom';

const DiscoverEvents = () => {
  const navigate = useNavigate();
  return (
    <section id="event-discovery" className="discover-section">
      <div className="discover-container">
        <div className="discover-header">
          <h2>Discover Exciting Events Near You</h2>
          <p>
            Find the perfect events that match your interests, location, and schedule with our powerful search tools.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="search-filter-card">
          <div className="filters-grid">
            <input type="text" placeholder="Search events..." />
            <select>
              <option>Location</option>
              <option>New York</option>
              <option>Los Angeles</option>
              <option>Chicago</option>
              <option>Miami</option>
              <option>Austin</option>
            </select>
            <select>
              <option>Date</option>
              <option>Today</option>
              <option>Tomorrow</option>
              <option>This Week</option>
              <option>This Weekend</option>
              <option>Next Week</option>
              <option>This Month</option>
            </select>
            <select>
              <option>Category</option>
              <option>Music</option>
              <option>Art & Culture</option>
              <option>Food & Drink</option>
              <option>Sports</option>
              <option>Technology</option>
              <option>Workshops</option>
            </select>
          </div>

          <div className="advanced-filters">
            <div>
              <span>Advanced filters:</span>
              <label><input type="checkbox" /> Free Events</label>
              <label><input type="checkbox" /> Family-friendly</label>
              <label><input type="checkbox" /> Accessible</label>
            </div>
            <button onClick={() => navigate('/signup')} >Search Events</button>
          </div>
        </div>


        {/* Categories */}
        <div className="category-grid">
          <h3>Browse by Category</h3>
          <div className="grid">
            {[
              { name: 'Music', color: 'purple', count: '412' },
              { name: 'Art & Culture', color: 'pink', count: '287' },
              { name: 'Food & Drink', color: 'green', count: '325' },
              { name: 'Sports', color: 'purple', count: '198' },
              { name: 'Technology', color: 'pink', count: '142' },
              { name: 'Workshops', color: 'green', count: '190' }
            ].map((cat, index) => (
              <a key={index} className={`category-card ${cat.color}`}>
                <div className="icon-circle">
                  <i className="fas fa-star"></i>
                </div>
                <h4>{cat.name}</h4>
                <p>{cat.count} events</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscoverEvents;
