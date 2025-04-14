import React, { useState } from 'react';
import './DiscoverEvents.css';
import { FaDesktop, FaMusic, FaBriefcase, FaLaptop } from 'react-icons/fa'; // Imported category icons
import Topbar from '../components/Topbar';
const dummyEvents = [
    // Technology Events
    {
      id: 1,
      title: 'TechTalks 2025',
      date: 'April 20, 2025',
      location: 'San Francisco, CA',
      category: 'Technology',
      image: 'https://source.unsplash.com/400x200/?tech,event',
      description: 'Explore the future of technology with top speakers and networking sessions.',
    },
    {
      id: 2,
      title: 'AI Innovation Summit',
      date: 'May 15, 2025',
      location: 'Silicon Valley, CA',
      category: 'Technology',
      image: 'https://source.unsplash.com/400x200/?ai,technology',
      description: 'Join experts in AI and machine learning for an inspiring summit.',
    },
    {
      id: 3,
      title: 'Future of Cybersecurity',
      date: 'June 5, 2025',
      location: 'New York, NY',
      category: 'Technology',
      image: 'https://source.unsplash.com/400x200/?cybersecurity,tech',
      description: 'Learn about the latest trends in cybersecurity and data protection.',
    },
    {
      id: 4,
      title: 'Blockchain Expo',
      date: 'July 10, 2025',
      location: 'Los Angeles, CA',
      category: 'Technology',
      image: 'https://source.unsplash.com/400x200/?blockchain,technology',
      description: 'Dive into the world of blockchain and decentralized technologies.',
    },
    {
      id: 5,
      title: 'Tech Innovators Conference',
      date: 'August 25, 2025',
      location: 'Austin, TX',
      category: 'Technology',
      image: 'https://source.unsplash.com/400x200/?innovation,tech',
      description: 'A conference celebrating the most innovative minds in tech.',
    },
  
    // Music Events
    {
      id: 6,
      title: 'Urban Music Fest',
      date: 'May 10, 2025',
      location: 'New York, NY',
      category: 'Music',
      image: 'https://source.unsplash.com/400x200/?music,concert',
      description: 'Feel the rhythm and vibes of the city’s biggest music celebration.',
    },
    {
      id: 7,
      title: 'Jazz Under the Stars',
      date: 'June 12, 2025',
      location: 'Chicago, IL',
      category: 'Music',
      image: 'https://source.unsplash.com/400x200/?jazz,concert',
      description: 'An unforgettable night of live jazz music in the heart of the city.',
    },
    {
      id: 8,
      title: 'Indie Music Fest',
      date: 'July 25, 2025',
      location: 'Austin, TX',
      category: 'Music',
      image: 'https://source.unsplash.com/400x200/?indie,festival',
      description: 'A celebration of the best indie artists from around the world.',
    },
    {
      id: 9,
      title: 'Rock and Roll Revival',
      date: 'August 15, 2025',
      location: 'Los Angeles, CA',
      category: 'Music',
      image: 'https://source.unsplash.com/400x200/?rock,concert',
      description: 'The ultimate rock and roll experience, featuring legendary bands.',
    },
    {
      id: 10,
      title: 'Electronic Music Expo',
      date: 'September 1, 2025',
      location: 'San Francisco, CA',
      category: 'Music',
      image: 'https://source.unsplash.com/400x200/?electronic,music',
      description: 'A weekend of cutting-edge electronic music and immersive experiences.',
    },
  
    // Business Events
    {
      id: 11,
      title: 'Startup Pitch Day',
      date: 'April 25, 2025',
      location: 'Austin, TX',
      category: 'Business',
      image: 'https://source.unsplash.com/400x200/?startup,business',
      description: 'Watch startups pitch and connect with investors, mentors, and peers.',
    },
    {
      id: 12,
      title: 'Entrepreneur Expo',
      date: 'May 30, 2025',
      location: 'Los Angeles, CA',
      category: 'Business',
      image: 'https://source.unsplash.com/400x200/?entrepreneur,business',
      description: 'An expo for entrepreneurs to showcase their startups and ideas.',
    },
    {
      id: 13,
      title: 'Tech Startup Networking',
      date: 'June 17, 2025',
      location: 'San Francisco, CA',
      category: 'Business',
      image: 'https://source.unsplash.com/400x200/?tech,networking',
      description: 'A networking event for tech entrepreneurs and investors.',
    },
    {
      id: 14,
      title: 'Venture Capital Summit',
      date: 'July 5, 2025',
      location: 'New York, NY',
      category: 'Business',
      image: 'https://source.unsplash.com/400x200/?venture,capital',
      description: 'A summit gathering top investors and promising startups.',
    },
    {
      id: 15,
      title: 'Small Business Conference',
      date: 'August 22, 2025',
      location: 'Chicago, IL',
      category: 'Business',
      image: 'https://source.unsplash.com/400x200/?small,business',
      description: 'Connect with small business owners and grow your network.',
    },
  ];
  

const DiscoverEvents = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Technology', 'Music', 'Business'];

  const categoryIcons = {
    All: <FaDesktop />,
    Technology: <FaLaptop />,
    Music: <FaMusic />,
    Business: <FaBriefcase />,
  };

  const filteredEvents = dummyEvents.filter(
    (event) =>
      (selectedCategory === 'All' || event.category === selectedCategory) &&
      event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="discover-container">
        <Topbar />

      <div className="discover-header">
        <h2>Discover Events</h2>
        <p>Find events that inspire and excite you</p>
      </div>

      <div className="discover-filters">
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="category-filter">
          {categories.map((cat) => (
            <button
              key={cat}
              className={selectedCategory === cat ? 'active' : ''}
              onClick={() => setSelectedCategory(cat)}
            >
              {categoryIcons[cat]} {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="events-grid">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div className="event-card" key={event.id}>
              <img src={event.image} alt={event.title} className="event-image" />
              <div className="event-info">
                <h3>{event.title}</h3>
                <p className="event-date">{event.date}</p>
                <p className="event-location">{event.location}</p>
                <p className="event-description">{event.description}</p>
                <button className="view-more-btn">View More</button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-events">No events found. Try another search or category!</div>
        )}
      </div>
    </div>
  );
};

export default DiscoverEvents;
