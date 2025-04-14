import React, { useState } from 'react';

const Sidebar = ({ users, loading, setSelectedUser }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user => 
    user.displayName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="sidebar">
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <div className="user-list">
        {loading ? (
          <p>Loading users...</p>
        ) : filteredUsers.length === 0 ? (
          <p>No users found</p>
        ) : (
          filteredUsers.map(user => (
            <div
              key={user.id}
              className="user-item"
              onClick={() => setSelectedUser(user)}
            >
              <img
                src={user.photoURL || 'https://i.pravatar.cc/150'}
                alt={user.displayName}
                className="user-avatar"
              />
              <span>{user.displayName}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Sidebar;
