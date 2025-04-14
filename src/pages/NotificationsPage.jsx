import React from 'react';
import './NotificationsPage.css';
import Topbar from '../components/Topbar';
const NotificationsPage = () => {
  const notifications = [
    {
      id: 1,
      title: "You have a new follower!",
      message: "John Doe started following you.",
      time: "2h ago",
      isNew: true,
    },
    {
      id: 2,
      title: "Event Reminder",
      message: "Don't forget the Startup Meetup at 6 PM.",
      time: "1d ago",
      isNew: false,
    },
    {
      id: 3,
      title: "Comment Received",
      message: "Alex commented on your post.",
      time: "3d ago",
      isNew: false,
    },
  ];

  return (
    <div className="notifications-page">
        <Topbar />
      <h2>Notifications</h2>
      <div className="notifications-list">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`notification-card ${notif.isNew ? 'new' : ''}`}
          >
            <div className="notification-header">
              <h4>{notif.title}</h4>
              <span className="time-stamp">{notif.time}</span>
            </div>
            <p>{notif.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
