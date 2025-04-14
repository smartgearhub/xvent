import React, { useState, useEffect } from 'react';
import './ProfilePage.css';
import Topbar from '../components/Topbar';
import SavedEventsSection from '../components/SavedEventsSection';
import { useParams } from 'react-router-dom';
import { db, auth } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

// Reusable display-only section component
const Section = ({ title, children }) => (
  <div className="editable-section">
    <div className="section-header">
      <h3>{title}</h3>
    </div>
    {children}
  </div>
);

const OtherUserProfilePage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          setUser(userDoc.data());
          if (auth.currentUser?.uid === userId) setIsOwner(true);
        }
      } catch (error) {
        console.error('Error loading user profile:', error);
      }
    };
    fetchUserProfile();
  }, [userId]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-page">
      <Topbar />

      <div className="profile-header">
        <div className="profile-info">
          <div className="avatar-wrapper">
            <img src={user.avatar} alt="Profile" className="profile-avatar" />
          </div>

          <h2>{user.name}</h2>
          <p>@{user.username}</p>
          <span>{user.location}</span>

          {isOwner && (
            <button className="edit-profile-btn">Edit Profile</button>
          )}
        </div>
      </div>

      <Section title="About">
        <p>{user.bio}</p>
      </Section>

      <Section title="Social Links">
        <ul className="social-links">
          {user.socialLinks?.map((link, i) => (
            <li key={i}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.platform}
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Testimonials">
        {user.reviews?.map((rev, i) => (
          <div className="review-card" key={i}>
            <p>"{rev.text}"</p>
            <span>- {rev.author}</span>
          </div>
        ))}
      </Section>

      <Section title="Achievements">
        <div className="badge-list">
          {user.badges?.map((badge, i) => (
            <div className="badge" key={i}>
              <div className="badge-content">
                <img src={badge.icon} alt={badge.name} className="badge-icon" />
                <div className="badge-text">
                  <span className="badge-name">{badge.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <SavedEventsSection />

    </div>
  );
};

export default OtherUserProfilePage;
