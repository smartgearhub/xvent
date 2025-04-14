import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import './SavedEventsSection.css';

const SavedEventsSection = () => {
  const [user, setUser] = useState({
    savedEvents: [
      {
        title: "Art Exhibition",
        date: "2025-05-10",
        time: "3:00 PM",
        description: "A community art exhibition showcasing local artists.",
        location: "Art Gallery, Downtown",
      },
      {
        title: "Tech Conference",
        date: "2025-06-15",
        time: "9:00 AM",
        description: "A tech conference with industry leaders and tech talks.",
        location: "Convention Center, City Center",
      },
    ],
  });

  const handleDeleteEvent = (index) => {
    const updatedEvents = user.savedEvents.filter((_, i) => i !== index);
    setUser({ ...user, savedEvents: updatedEvents });
  };

  return (
    <div className="saved-events-section">
      <h2>Saved Events</h2>
      <div className="event-cards-container">
        {user.savedEvents.map((event, index) => (
          <div key={index} className="event-card">
            <div className="event-card-header">
              <h3>{event.title}</h3>
              <button className="delete-btn" onClick={() => handleDeleteEvent(index)}>
                <FaTrashAlt />
              </button>
            </div>
            <p><strong>Date:</strong> {event.date} at {event.time}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p className="event-description">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedEventsSection;
