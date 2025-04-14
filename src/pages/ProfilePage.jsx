import React, { useState, useEffect } from 'react';
import './ProfilePage.css';
import { Dialog } from '@radix-ui/react-dialog';
import { FaEdit, FaTrash, FaPlus, FaLink, FaTrashAlt } from 'react-icons/fa';
import SavedEventsSection from '../components/SavedEventsSection';
import Topbar from '../components/Topbar';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const EditableSection = ({ title, children, onEdit, onAdd }) => (
  <div className="editable-section">
    <div className="section-header">
      <h3>{title}</h3>
      <div className="section-actions">
        {onEdit && (
          <button className="icon-btn" onClick={onEdit}><FaEdit /></button>
        )}
        {onAdd && (
          <button className="icon-btn" onClick={onAdd}><FaPlus /></button>
        )}
      </div>
    </div>
    {children}
  </div>
);

const ProfilePage = () => {
  const [user, setUser] = useState(null); // null until loaded
  const [modalData, setModalData] = useState({ open: false, title: '', content: null });
  const [loading, setLoading] = useState(true);

  const openModal = (title, content) => setModalData({ open: true, title, content });
  const closeModal = () => setModalData({ ...modalData, open: false });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const uid = firebaseUser.uid;
        const userRef = doc(db, 'users', uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          setUser(docSnap.data());
        } else {
          const newUser = {
            name: firebaseUser.displayName || "New User",
            username: firebaseUser.email.split("@")[0],
            location: "Unknown",
            avatar: "/images/default-avatar.jpg",
            coverPhoto: "/images/cover.jpg",
            bio: "Tell us something about yourself!",
            socialLinks: [],
            created: [],
            attended: [],
            saved: [],
            followers: 0,
            following: 0,
            reviews: [],
            badges: [],
            skills: [],
            nameLowercase: (firebaseUser.displayName || "new user").toLowerCase(),
          };

          await setDoc(userRef, newUser);
          setUser(newUser);
        }

        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleEditField = (field, label, type = 'text') => {
    openModal(`Edit ${label}`, (
      <form onSubmit={(e) => {
        e.preventDefault();
        const newValue = e.target.elements[0].value;
        const updated = { ...user, [field]: newValue };
        setUser(updated);
        updateDoc(doc(db, 'users', auth.currentUser.uid), { [field]: newValue });
        closeModal();
      }}>
        <input type={type} defaultValue={user[field]} required />
        <button type="submit">Save</button>
      </form>
    ));
  };

  const handleAddToList = (key, fields) => {
    openModal(`Add ${key}`, (
      <form onSubmit={(e) => {
        e.preventDefault();
        const newItem = {};
        fields.forEach((field, i) => {
          newItem[field] = e.target.elements[i].value;
        });
        const updatedList = [...(user[key] || []), newItem];
        setUser({ ...user, [key]: updatedList });
        updateDoc(doc(db, 'users', auth.currentUser.uid), { [key]: updatedList });
        closeModal();
      }}>
        {fields.map((field, i) => <input key={i} placeholder={field} required />)}
        <button type="submit">Add</button>
      </form>
    ));
  };

  const handleDeleteItem = (key, index) => {
    const newList = [...(user[key] || [])];
    newList.splice(index, 1);
    setUser({ ...user, [key]: newList });
    updateDoc(doc(db, 'users', auth.currentUser.uid), { [key]: newList });
  };

  const handleEditListItem = (key, index, fields) => {
    const currentItem = user[key][index];
    openModal(`Edit ${key}`, (
      <form onSubmit={(e) => {
        e.preventDefault();
        const updatedItem = {};
        fields.forEach((field, i) => {
          updatedItem[field] = e.target.elements[i].value;
        });
        const newList = [...user[key]];
        newList[index] = updatedItem;
        setUser({ ...user, [key]: newList });
        updateDoc(doc(db, 'users', auth.currentUser.uid), { [key]: newList });
        closeModal();
      }}>
        {fields.map((field, i) => (
          <input key={i} defaultValue={currentItem[field]} required />
        ))}
        <button type="submit">Save</button>
      </form>
    ));
  };

  if (loading || !user) return <div className="loading">Loading profile...</div>;

  return (
    <div className="profile-page">
      <Topbar />

      <div className="profile-header">
        <div className="profile-info">
          <div className="avatar-wrapper">
            <label htmlFor="avatarUpload">
              <img src={user.avatar} alt="Profile" className="profile-avatar" />
              <div className="image-overlay avatar-overlay">Change</div>
              <input
                type="file"
                id="avatarUpload"
                accept="image/*"
                hidden
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const imageUrl = URL.createObjectURL(file);
                    setUser({ ...user, avatar: imageUrl });
                    updateDoc(doc(db, 'users', auth.currentUser.uid), { avatar: imageUrl });
                  }
                }}
              />
            </label>
          </div>

          <h2 className="editable-text" onClick={() => handleEditField('name', 'Name')}>
            {user.name}
          </h2>
          <p className="editable-text" onClick={() => handleEditField('username', 'Username')}>
            @{user.username}
          </p>
          <span className="editable-text" onClick={() => handleEditField('location', 'Location')}>
            {user.location}
          </span>

          <button className="edit-profile-btn" onClick={() => handleEditField('name', 'Name')}>
            Edit Profile
          </button>
        </div>
      </div>

      <EditableSection title="About" onEdit={() => handleEditField('bio', 'Bio')}>
        <p>{user.bio}</p>
      </EditableSection>

      <EditableSection title="Social Links" onAdd={() => handleAddToList('socialLinks', ['platform', 'url'])}>
        <ul className="social-links">
          {(user.socialLinks || []).map((link, i) => (
            <li key={i}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                <FaLink /> {link.platform}
              </a>
              <button className="icon-btn" onClick={() => handleEditListItem('socialLinks', i, ['platform', 'url'])}>
                <FaEdit />
              </button>
              <button className="icon-btn" onClick={() => handleDeleteItem('socialLinks', i)}>
                <FaTrashAlt />
              </button>
            </li>
          ))}
        </ul>
      </EditableSection>

      <EditableSection title="Testimonials" onAdd={() => handleAddToList('reviews', ['text', 'author'])}>
        {(user.reviews || []).map((rev, i) => (
          <div className="review-card" key={i}>
            <p>"{rev.text}"</p>
            <span>- {rev.author}</span>
            <div className="review-actions">
              <button className="icon-btn" onClick={() => handleEditListItem('reviews', i, ['text', 'author'])}>
                <FaEdit />
              </button>
              <button className="icon-btn" onClick={() => handleDeleteItem('reviews', i)}>
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </EditableSection>

      <EditableSection title="Achievements" onAdd={() => handleAddToList('badges', ['name', 'icon'])}>
        <div className="badge-list">
          {(user.badges || []).map((badge, i) => (
            <div className="badge" key={i}>
              <div className="badge-content">
                <img src={badge.icon} alt={badge.name} className="badge-icon" />
                <div className="badge-text">
                  <span className="badge-name">{badge.name}</span>
                </div>
              </div>
              <div className="badge-actions">
                <button className="icon-btn edit-btn" onClick={() => handleEditListItem('badges', i, ['name', 'icon'])}>
                  <FaEdit />
                </button>
                <button className="icon-btn delete-btn" onClick={() => handleDeleteItem('badges', i)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </EditableSection>

      <SavedEventsSection />

      {modalData.open && (
        <Dialog open={modalData.open} onOpenChange={closeModal}>
          <div className="modal-overlay">
            <div className="modal-content enhanced">
              <button className="close-btn" onClick={closeModal}>×</button>
              <h2>{modalData.title}</h2>
              {modalData.content}
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default ProfilePage;
