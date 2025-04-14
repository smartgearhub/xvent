import React, { useState, useEffect } from 'react';
import './SettingsPage.css';
import Topbar from '../components/Topbar';
import { auth, db } from '../firebase';
import { updateProfile, deleteUser } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [autoRSVP, setAutoRSVP] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUsername(data.username || '');
          setEmail(user.email);
        }
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, [user]);

  const handleUpdateProfile = async () => {
    if (user) {
      await updateProfile(user, { displayName: username });
      await updateDoc(doc(db, 'users', user.uid), {
        username,
      });
      alert('Profile updated!');
    }
  };

  const handleDeleteAccount = async () => {
    if (user && window.confirm('Are you sure you want to delete your account?')) {
      await deleteUser(user);
      navigate('/login');
    }
  };

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/login');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className={`settings-container ${darkMode ? 'dark' : ''}`}>
      <Topbar />
      <div className="settings-wrapper">
        <h2 className="settings-title">Settings</h2>

        {/* Account Settings */}
        <section className="settings-section">
          <h3>Account</h3>
          <div className="settings-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="settings-group">
            <label>Email</label>
            <input type="email" value={email} disabled />
          </div>
          <div className="settings-group">
            <label>Change Password</label>
            <input type="password" placeholder="New Password" disabled />
          </div>
          <button onClick={handleUpdateProfile}>Update Profile</button>
          <button className="btn-danger" onClick={handleDeleteAccount}>Delete Account</button>
        </section>

        {/* Privacy Settings */}
        <section className="settings-section">
          <h3>Privacy</h3>
          <div className="settings-group">
            <label>Who can message you</label>
            <select>
              <option>Everyone</option>
              <option>Friends Only</option>
              <option>No one</option>
            </select>
          </div>
          <div className="settings-group">
            <label>Blocked Users</label>
            <textarea placeholder="List of blocked users..."></textarea>
          </div>
          <div className="settings-toggle">
            <label>Two-Factor Authentication</label>
            <input type="checkbox" />
          </div>
        </section>

        {/* Notification Settings */}
        <section className="settings-section">
          <h3>Notifications</h3>
          <div className="settings-toggle">
            <label>Email Notifications</label>
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={() => setEmailNotifications(!emailNotifications)}
            />
          </div>
          <div className="settings-toggle">
            <label>Push Notifications</label>
            <input
              type="checkbox"
              checked={pushNotifications}
              onChange={() => setPushNotifications(!pushNotifications)}
            />
          </div>
          <div className="settings-toggle">
            <label>Event Reminders</label>
            <input type="checkbox" defaultChecked />
          </div>
        </section>

        {/* Appearance */}
        <section className="settings-section">
          <h3>Appearance</h3>
          <div className="settings-toggle">
            <label>Dark Mode</label>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
          </div>
          <div className="settings-group">
            <label>Font Size</label>
            <select defaultValue="Medium">
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
            </select>
          </div>
        </section>

        {/* Event Preferences */}
        <section className="settings-section">
          <h3>Event Preferences</h3>
          <div className="settings-group">
            <label>Preferred Categories</label>
            <div className="checkbox-group">
              <label><input type="checkbox" /> Music</label>
              <label><input type="checkbox" /> Tech</label>
              <label><input type="checkbox" /> Sports</label>
              <label><input type="checkbox" /> Art</label>
            </div>
          </div>
          <div className="settings-group">
            <label>Default Location</label>
            <input type="text" placeholder="New York, NY" />
          </div>
          <div className="settings-toggle">
            <label>Auto RSVP to invited events</label>
            <input
              type="checkbox"
              checked={autoRSVP}
              onChange={() => setAutoRSVP(!autoRSVP)}
            />
          </div>
        </section>

        {/* Connected Accounts */}
        <section className="settings-section">
          <h3>Connected Accounts</h3>
          <div className="settings-group">
            <label>Google</label>
            <button>Disconnect</button>
          </div>
          <div className="settings-group">
            <label>Facebook</label>
            <button>Connect</button>
          </div>
        </section>

        {/* Support */}
        <section className="settings-section">
          <h3>App Info & Support</h3>
          <button className="link-btn">Terms of Service</button>
          <button className="link-btn">Privacy Policy</button>
          <button className="link-btn">Contact Support</button>
          <button className="btn-danger" onClick={handleLogout}>Logout</button>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;
