import React, { useState, useEffect, useRef } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import MessageInput from './MessageInput';
import { db } from '../firebase'; // Firebase connection
import { doc, setDoc, getDoc, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const ChatWindow = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const auth = getAuth();
  const currentUser = auth.currentUser;
  
  useEffect(() => {
    const fetchMessages = async () => {
      const chatId = [currentUser.uid, user.id].sort().join('_');
      const messagesRef = collection(db, 'messages', chatId, 'chat');
      
      const messagesSnapshot = await getDocs(messagesRef);
      const messagesList = messagesSnapshot.docs.map(doc => doc.data());
      setMessages(messagesList);
    };

    fetchMessages();
  }, [user]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async (message) => {
    const chatId = [currentUser.uid, user.id].sort().join('_');
    const newMessageRef = doc(db, 'messages', chatId, 'chat', new Date().toISOString());
    const newMessage = {
      from: currentUser.uid,
      to: user.id,
      text: message,
      timestamp: new Date(),
    };

    await setDoc(newMessageRef, newMessage);

    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <img
          src={user.photoURL || 'https://i.pravatar.cc/150'}
          alt={user.displayName}
          className="chat-avatar"
        />
        <span>{user.displayName}</span>
      </div>
      <div className="chat-body">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.from === currentUser.uid ? 'sent' : 'received'}`}>
            <p>{msg.text}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <MessageInput onSend={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;
