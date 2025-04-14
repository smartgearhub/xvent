import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import './SearchBar.css';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const handleSearchChange = async (e) => {
    const queryValue = e.target.value;
    setSearchQuery(queryValue);

    if (queryValue.length >= 3) {
      // Search for users whose names match the query
      const q = query(
        collection(db, 'users'),
        where('name', '>=', queryValue),
        where('name', '<=', queryValue + '\uf8ff')  // To ensure case-insensitive searching
      );

      const querySnapshot = await getDocs(q);
      const usersList = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUsers(usersList);
    } else {
      setUsers([]);
    }
  };

  const handleUserClick = (userId) => {
    // Navigate to the profile page of the user
    navigate(`/profile/${userId}`);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search users by name..."
      />
      <div className="search-results">
        {users.length > 0 &&
          users.map((user) => (
            <div
              key={user.id}
              className="search-result-item"
              onClick={() => handleUserClick(user.id)}
            >
              <span>{user.name}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchBar;
