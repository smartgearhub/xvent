import React from 'react';
import './DiscoverEvents.css';

const DiscoverEvents = () => {
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
            <button>Search Events</button>
          </div>
        </div>

        {/* Featured Events */}
        <div className="featured-events">
          <div className="featured-header">
            <h3>Featured Events</h3>
            <a href="#">View All →</a>
          </div>

          <div className="events-grid">
            {/* Event Card 1 */}
            <div className="event-carde">
              <div className="event-img">
                <img src="images/placehold.co-600x400" alt="Summer Music Festival" />
                <span className="tag pink">Featured</span>
              </div>
              <div className="event-content">
                <div className="event-meta">
                  <span className="category purple">Music</span>
                  <span className="time">Jul 15 • 7:00 PM</span>
                </div>
                <h4>Summer Music Festival</h4>
                <p className="location">Downtown Arts Center, New York</p>
                <p className="desc">
                  Enjoy a night of amazing performances from top artists across multiple genres in this annual summer celebration.
                </p>
                <button>Get Tickets</button>
              </div>
            </div>

            {/* Event Card 2 */}
            <div className="event-carde">
              <div className="event-img">
                <img src="images/placehold.co-600x400" alt="Art Exhibition" />
                <span className="tag green">New</span>
              </div>
              <div className="event-content">
                <div className="event-meta">
                  <span className="category green">Art</span>
                  <span className="time">Jul 18 • 6:00 PM</span>
                </div>
                <h4>Modern Art Exhibition</h4>
                <p className="location">Metropolitan Art Gallery, Chicago</p>
                <p className="desc">
                  Experience stunning works from emerging artists in this exclusive opening night with refreshments and artist talks.
                </p>
                <button>Get Tickets</button>
              </div>
            </div>

            {/* Event Card 3 */}
            <div className="event-carde">
              <div className="event-img">
                <img src="images/placehold.co-600x400" alt="Food Festival" />
                <span className="tag pink">Popular</span>
              </div>
              <div className="event-content">
                <div className="event-meta">
                  <span className="category red">Food</span>
                  <span className="time">Jul 22–24 • All Day</span>
                </div>
                <h4>International Food Festival</h4>
                <p className="location">Riverfront Park, Miami</p>
                <p className="desc">
                  Taste cuisine from around the world at this weekend-long festival featuring over 50 vendors, cooking demos, and live music.
                </p>
                <button>Get Tickets</button>
              </div>
            </div>
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
