import React, { useState, useEffect, useRef } from 'react';
import { FaPaperPlane, FaSmile, FaPaperclip } from 'react-icons/fa';
import {
  collection,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';
import { db, auth } from '../firebase';
import './MessagesPage.css';
import Topbar from '../components/Topbar';

const MessagesPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  const currentUser = auth.currentUser;

  const getChatId = (uid1, uid2) =>
    uid1 > uid2 ? `${uid1}_${uid2}` : `${uid2}_${uid1}`;

  // Fetch all users except the current user
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError('');
      try {
        const snapshot = await getDocs(collection(db, 'users'));
        const allUsers = snapshot.docs.map(doc => ({
          ...doc.data(),
          uid: doc.id // Assuming the document ID is the uid
        }));
        const filtered = allUsers.filter(user => user.uid !== currentUser?.uid);
        setUsers(filtered);
      } catch (err) {
        setError('Failed to load users. Please check Firestore.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentUser]);

  const filteredUsers = users.filter(user =>
    (user.displayName || user.username || 'unknown').toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fetch messages when a user is selected
  useEffect(() => {
    if (!selectedUser) return;

    const chatId = getChatId(currentUser.uid, selectedUser.uid);
    const q = query(collection(db, 'messages', chatId, 'chat'), orderBy('timestamp'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedMessages = snapshot.docs.map(doc => doc.data());
        setMessages(fetchedMessages);
      },
      (err) => {
        console.error('Error fetching messages:', err);
        setError('Failed to fetch messages.');
      }
    );

    return () => unsubscribe();
  }, [selectedUser]);

  const handleSend = async () => {
    if (messageInput.trim() === '') return;

    const chatId = getChatId(currentUser.uid, selectedUser.uid);
    const messageData = {
      sender: currentUser.uid,
      receiver: selectedUser.uid,
      text: messageInput,
      timestamp: serverTimestamp(),
      senderName: currentUser.displayName || 'You',
    };

    try {
      await addDoc(collection(db, 'messages', chatId, 'chat'), messageData);
      setMessageInput('');
    } catch (err) {
      console.error('Error sending message:', err.message);
      setError('Failed to send message. Please try again.');
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="messages-page">
      <Topbar />
      <div className="messages-container">
        {/* Sidebar */}
        <aside className="sidebar-conversations">
          <h3 className="sidebar-title">Messages</h3>
          <input
            type="text"
            placeholder="Search users..."
            className="search-bar"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            disabled={loading || !!error}
          />

          {loading && <p className="loading-text">Loading users...</p>}
          {error && <p className="error-text">{error}</p>}

          {!loading && !error && filteredUsers.length === 0 && (
            <p className="no-users-text">No users found.</p>
          )}

          {!loading && !error &&
            filteredUsers.map(user => (
              <div
                key={user.uid}
                className={`chat-preview ${selectedUser?.uid === user.uid ? 'active' : ''}`}
                onClick={() => setSelectedUser(user)}
              >
                <img
                  src={user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`}
                  alt={user.displayName}
                  className="chat-avatar"
                />
                <div>
                  <h4>{user.displayName || user.username || 'Unknown'}</h4>
                  <p>{user.email}</p>
                </div>
              </div>
            ))}
        </aside>

        {/* Chat Window */}
        <main className="chat-window">
          {selectedUser ? (
            <>
              <div className="chat-header">
                <img
                  src={selectedUser.photoURL || `https://i.pravatar.cc/150?u=${selectedUser.uid}`}
                  alt={selectedUser.displayName}
                  className="chat-avatar-large"
                />
                <h3>{selectedUser.displayName || selectedUser.username}</h3>
              </div>

              <div className="chat-body">
                {messages.length === 0 ? (
                  <p className="no-chat">No chat yet.</p>
                ) : (
                  messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`chat-message ${msg.sender === currentUser.uid ? 'sent' : 'received'}`}
                    >
                      <div className="chat-bubble">
                        <p>{msg.text}</p>
                        <span className="chat-time">{formatTime(msg.timestamp)}</span>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="chat-input">
                <FaSmile className="input-icon" />
                <FaPaperclip className="input-icon" />
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                />
                <button onClick={handleSend}><FaPaperPlane /></button>
              </div>
            </>
          ) : (
            <div className="chat-placeholder">
              <p>Select a user to start chatting.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default MessagesPage;
