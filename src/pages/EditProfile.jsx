import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';
import './EditProfile.css'; // Import your CSS file for styling

const EditProfile = () => {
  const { userId } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        setUserProfile(userDoc.data());
        setName(userDoc.data().name);
        setBio(userDoc.data().bio || '');
      }
    };
    fetchUserProfile();
  }, [userId]);

  const handleSave = async () => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        name: name,
        bio: bio,
      });
      navigate(`/profile/${userId}`);
    } catch (error) {
      console.error("Error updating profile: ", error);
    }
  };

  return (
    <div className="edit-profile">
      <h2>Edit Profile</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full Name"
      />
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Bio"
      />
      <button onClick={handleSave}>Save Changes</button>
    </div>
  );
};

export default EditProfile;
